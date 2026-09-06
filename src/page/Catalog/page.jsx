import { useMemo, useRef, useState } from 'react'
import { CatalogFilters } from '../../components/catalog/CatalogFilters'
import { CatalogGrid } from '../../components/catalog/CatalogGrid'
import { CatalogHero } from '../../components/catalog/CatalogHero'
import { CatalogPagination } from '../../components/catalog/CatalogPagination'
import { CatalogState } from '../../components/catalog/CatalogState'
import { CatalogToolbar } from '../../components/catalog/CatalogToolbar'
import { AnnouncementBar } from '../../components/layout/AnnouncementBar'
import { Footer } from '../../components/layout/Footer'
import { Navbar } from '../../components/layout/Navbar'
import { catalogCopy } from '../../data/catalog'
import { useApiResource } from '../../hooks/useApiResource'
import { useCatalogFilters } from '../../hooks/useCatalogFilters'
import { getCatalog } from '../../services/catalog'
import { filtrarProductos, indexar, paginar } from '../../utils/catalog'

/**
 * El catálogo entero. La misma cáscara que la portada —anuncio, navbar, footer—;
 * lo que cambia es que esta página SÍ pide sus datos al servidor, y es la primera
 * de la tienda que lo hace.
 *
 * SE PIDE UNA VEZ Y SE FILTRA EN MEMORIA. `getCatalog` es una función de módulo
 * sin argumentos, así que es una referencia estable y cambiar un filtro no cambia
 * el fetcher: useApiResource no vuelve a pedir nunca. Es lo que permite que el
 * deslizador de precio responda al arrastre en vez de esperar a la red, y lo que
 * hace que las cuentas de las casillas sean las del catálogo entero —si
 * encogieran al filtrar, nadie sabría qué se está perdiendo—.
 *
 * `abierto` es estado local y no un parámetro de la URL: si el raíl está
 * desplegado es un modo de la interfaz, no un filtro, y compartir un enlace no
 * debe abrirle el panel a quien lo reciba. La PÁGINA sí va en la URL, con el
 * mismo criterio al revés: «mira la página 3 de esto» es una dirección que se
 * comparte, y el botón atrás tiene que deshacerla.
 */
export default function Catalog() {
  const { data, status, error, reload } = useApiResource(getCatalog)
  const { filtros, activos, acciones } = useCatalogFilters()
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const resultadosRef = useRef(null)

  // Una vez por respuesta: los mapas de rótulo y la cadena de búsqueda ya
  // normalizada de cada pieza. Filtrar después no vuelve a tocar ninguna de las
  // dos cosas.
  const catalogo = useMemo(() => (data ? indexar(data) : null), [data])

  const resultados = useMemo(
    () => (catalogo ? filtrarProductos(catalogo.items, filtros, catalogo.facetas.precio) : []),
    [catalogo, filtros],
  )

  // Se pagina DESPUÉS de filtrar y sobre el resultado entero, que es lo que hace
  // que la barra siga contando las 35 piezas mientras la retícula enseña nueve.
  const pagina = useMemo(
    () => paginar(resultados, filtros.pagina),
    [resultados, filtros.pagina],
  )

  /**
   * Cambiar de página deja la vista a media retícula, así que hay que volver
   * arriba. Va en el manejador y no en un efecto sobre `filtros.pagina`: un
   * efecto también saltaría en el primer render y al llegar desde el navbar con
   * un filtro puesto, que es un salto que nadie pidió.
   *
   * Sin `behavior: 'smooth'`: el barrido del botón de envío es la única animación
   * del proyecto y no toca ampliar la lista por esto.
   */
  const irAPagina = (n) => {
    acciones.irAPagina(n)
    resultadosRef.current?.scrollIntoView()
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <AnnouncementBar />
      <Navbar />

      <main>
        <CatalogHero />

        <section className="bg-paper px-gutter py-[clamp(38px,5vw,72px)] text-ink">
          {/* `scroll-mt` para que al cambiar de página el ancla no quede debajo
              del navbar pegajoso — el mismo 92px del `lg:top` del raíl, más el
              aire de la barra de anuncios. */}
          <div ref={resultadosRef} className="mx-auto max-w-shell scroll-mt-[100px]">
            {status !== 'ready' ? (
              <CatalogState status={status} error={error} onRetry={reload} />
            ) : (
              <>
                {/* La barra va por encima de las dos columnas, y eso resuelve un
                    detalle de móvil: si el botón «Filtros» estuviera debajo del
                    raíl, abrirlo lo empujaría hacia abajo y se movería justo bajo
                    el dedo que acaba de pulsarlo. */}
                <CatalogToolbar
                  count={resultados.length}
                  total={catalogo.total}
                  activos={activos}
                  rotulos={catalogo.rotulos}
                  precio={catalogo.facetas.precio}
                  filtros={filtros}
                  acciones={acciones}
                  filtrosAbiertos={filtrosAbiertos}
                  onToggleFiltros={() => setFiltrosAbiertos((abierto) => !abierto)}
                />

                {/* 320px y no 280: la fila más ancha del raíl —«Monturas y
                    talabartería» con su cuenta— pide 250px, y con 280 el ancho
                    útil se quedaba en 242 y la etiqueta se cortaba. */}
                <div className="lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-[clamp(24px,2.6vw,44px)]">
                  {/* `self-start` no es adorno: sin él la columna se estira a lo
                      alto de la fila y el sticky se queda sin recorrido.

                      SE PEGA POR ABAJO Y NO POR ARRIBA, que es lo que pide un
                      raíl más alto que la pantalla: el raíl se pinta entero
                      —ocho grupos, ~1150px— y con `top` quedaría clavado a 92px
                      del borde con su último grupo permanentemente fuera de
                      cuadro, sin forma de alcanzarlo. Con `bottom` acompaña al
                      scroll mientras lo recorres y se ancla cuando su final llega
                      al pie de la ventana.

                      Y el sticky no puede invadir el footer porque su caja de
                      contención es la celda de esta retícula: mientras el Frame
                      no se salga del <aside> —ver CatalogFilters—, el raíl se
                      detiene donde acaba la fila. */}
                  <aside
                    aria-label={catalogCopy.filtros}
                    className={`${filtrosAbiertos ? 'mb-[28px] block' : 'hidden'} lg:sticky lg:bottom-[20px] lg:mb-0 lg:block lg:self-start`}
                  >
                    <CatalogFilters
                      facetas={catalogo.facetas}
                      filtros={filtros}
                      acciones={acciones}
                    />
                  </aside>

                  {/* La retícula y sus números son una sola columna: el div
                      envuelve a los dos para que la paginación no se convierta
                      en una tercera fila de la retícula exterior, debajo del
                      raíl. */}
                  <div>
                    <CatalogGrid
                      items={pagina.items}
                      rotulos={catalogo.rotulos}
                      onLimpiar={acciones.limpiar}
                    />

                    <CatalogPagination
                      pagina={pagina.pagina}
                      total={pagina.total}
                      onIr={irAPagina}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
