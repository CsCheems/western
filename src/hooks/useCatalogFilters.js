import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Los filtros del catálogo, guardados en el query string y en ningún otro sitio.
 *
 * La URL es el estado, no una copia de él. Eso es lo que hace que un filtro se
 * pueda compartir por WhatsApp, sobreviva a F5 y se deshaga con el botón atrás,
 * y es también lo que permite que el navbar «filtre» sin conocer esta página:
 * sus enlaces solo escriben una dirección.
 *
 * Las listas viajan como CLAVE REPETIDA —?categoria=botas&categoria=sombreros— y
 * no unidas por comas. getAll() lo lee y append() lo escribe, así que no hay
 * parseo que escribir ni regla de escape que inventar para un valor con coma; y
 * una cadena vacía unida por comas se parte en [''], que hay que acordarse de
 * filtrar. Es además lo que produciría un <form method="get">.
 */

// Los cuatro grupos de casillas. El resto de parámetros son escalares.
const MULTIPLES = ['categoria', 'genero', 'marca', 'fieltro']

const numero = (crudo) => {
  const n = Number(crudo)

  return crudo !== null && crudo !== '' && Number.isFinite(n) ? n : null
}

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Se memoriza sobre la CADENA y no sobre la instancia: react-router puede
  // devolver un URLSearchParams nuevo en cada render, y entonces `filtros`
  // cambiaría de identidad siempre y el useMemo de los resultados —que depende de
  // él— no memorizaría absolutamente nada.
  const query = searchParams.toString()

  const filtros = useMemo(() => {
    const params = new URLSearchParams(query)
    const listas = Object.fromEntries(MULTIPLES.map((clave) => [clave, new Set(params.getAll(clave))]))

    return {
      ...listas,
      q: params.get('q') ?? '',
      min: numero(params.get('min')),
      max: numero(params.get('max')),
      disponibles: params.get('disponibles') === '1',
    }
  }, [query])

  /**
   * Un valor vacío —Set vacío, cadena vacía, null, false— BORRA la clave. Así
   * «/catalogo» a secas es siempre el catálogo entero y no hay dos direcciones
   * distintas que signifiquen lo mismo.
   *
   * Forma de actualizador y no de valor: el deslizador confirma con retardo, y
   * sin esto una confirmación que cayera en el mismo tick que una casilla pisaría
   * los parámetros que la casilla acababa de escribir.
   */
  const escribir = useCallback(
    (cambios, { replace = false } = {}) => {
      setSearchParams(
        (actuales) => {
          const siguientes = new URLSearchParams(actuales)

          for (const [clave, valor] of Object.entries(cambios)) {
            siguientes.delete(clave)

            const lista = valor instanceof Set ? [...valor] : Array.isArray(valor) ? valor : [valor]

            for (const uno of lista) {
              if (uno === null || uno === undefined || uno === '' || uno === false) continue

              siguientes.append(clave, uno === true ? '1' : String(uno))
            }
          }

          return siguientes
        },
        { replace },
      )
    },
    [setSearchParams],
  )

  /**
   * Historial: empuja lo discreto y sustituye lo continuo.
   *
   * Marcar una casilla o quitar una ficha SON pasos que quisiste dar, y que
   * «atrás» deshaga un «limpiar todo» es lo que hace seguro probarlo. Una tecla
   * del buscador o un píxel del deslizador no lo son: sin `replace` el botón
   * atrás te pasearía por «l», «la», «lar», «lare».
   */
  const acciones = useMemo(
    () => ({
      alternar(param, valor) {
        const siguiente = new Set(filtros[param])

        if (siguiente.has(valor)) siguiente.delete(valor)
        else siguiente.add(valor)

        escribir({ [param]: siguiente })
      },

      quitar(param, valor) {
        const siguiente = new Set(filtros[param])

        siguiente.delete(valor)
        escribir({ [param]: siguiente })
      },

      buscar(texto) {
        escribir({ q: texto.trim() }, { replace: true })
      },

      precio(min, max) {
        escribir({ min, max }, { replace: true })
      },

      disponibilidad(activo) {
        escribir({ disponibles: activo })
      },

      limpiar() {
        escribir({
          categoria: null,
          genero: null,
          marca: null,
          fieltro: null,
          q: null,
          min: null,
          max: null,
          disponibles: null,
        })
      },
    }),
    [filtros, escribir],
  )

  /**
   * Lo que hay puesto ahora mismo, para las fichas de la barra de resultados.
   *
   * Sale sin rótulos a propósito: los rótulos viven en las facetas que trajo el
   * servidor, y este hook no sabe de peticiones. Quien pinta la ficha los
   * resuelve, que además es quien ya los tiene a mano.
   */
  const activos = useMemo(() => {
    const fichas = []

    for (const param of MULTIPLES) {
      for (const valor of filtros[param]) fichas.push({ tipo: 'lista', param, valor })
    }

    if (filtros.q) fichas.push({ tipo: 'texto', param: 'q', valor: filtros.q })
    if (filtros.min !== null || filtros.max !== null) fichas.push({ tipo: 'precio', param: 'precio' })
    if (filtros.disponibles) fichas.push({ tipo: 'bool', param: 'disponibles' })

    return fichas
  }, [filtros])

  return { filtros, activos, acciones, hayFiltros: activos.length > 0 }
}
