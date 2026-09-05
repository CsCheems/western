// Las dos funciones puras del catálogo: preparar los datos una vez y filtrarlos
// muchas. Sin React, sin red y sin estado, para que se puedan leer —y equivocar—
// por separado de la página.

/**
 * Quita los acentos para poder comparar.
 *
 * En es-MX esto no es un detalle: nadie escribe «Cañón» en un buscador, se
 * escribe «canon», y una tienda que no encuentre sus propios sombreros por eso
 * está rota. La ñ se pierde por el camino (cañón → canon) y da igual: el objetivo
 * es que la búsqueda perdone, no que respete la ortografía.
 */
const plano = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

/**
 * Prepara la respuesta del servidor para que filtrar sea barato.
 *
 * Se hace UNA vez por petición y deja dos cosas: los mapas de rótulo de cada
 * faceta —que necesitan la tarjeta y las fichas de filtro activo para escribir
 * «Botas» donde la URL dice «botas»— y una cadena de búsqueda ya normalizada por
 * artículo, para no normalizar treinta y cinco títulos en cada tecla.
 */
export function indexar(data) {
  const mapa = (lista) => new Map(lista.map((entrada) => [entrada.id, entrada.label]))

  const rotulos = {
    categoria: mapa(data.facetas.categorias),
    genero: mapa(data.facetas.generos),
    marca: mapa(data.facetas.marcas),
    fieltro: mapa(data.facetas.fieltros),
  }

  const items = data.items.map((producto) => ({
    ...producto,
    // El taller entra en la búsqueda: quien escribe «broncoware» está buscando
    // por marca aunque no toque la casilla.
    busqueda: plano(
      [
        producto.titulo,
        producto.descripcion,
        rotulos.categoria.get(producto.categoria) ?? '',
        rotulos.marca.get(producto.marca) ?? '',
      ].join(' '),
    ),
  }))

  return { items, facetas: data.facetas, rotulos, total: data.total }
}

/**
 * Aplica los filtros de la URL sobre el catálogo ya indexado.
 *
 * Un Set vacío no filtra nada —«ninguna casilla marcada» significa «todas», no
 * «ninguna»—, que es lo que hace que /catalogo a secas enseñe la tienda entera.
 *
 * Los topes del precio se acotan contra los reales: si la URL trae un ?min= por
 * encima del artículo más caro, el resultado es una retícula vacía con su ficha
 * a la vista, no un fallo ni una lista que finge estar completa.
 */
export function filtrarProductos(items, filtros, precio) {
  const min = filtros.min ?? precio.min
  const max = filtros.max ?? precio.max
  const texto = plano(filtros.q.trim())

  const enSet = (conjunto, valor) => conjunto.size === 0 || conjunto.has(valor)

  return items.filter(
    (producto) =>
      enSet(filtros.categoria, producto.categoria) &&
      enSet(filtros.genero, producto.genero) &&
      enSet(filtros.marca, producto.marca) &&
      enSet(filtros.fieltro, producto.fieltro) &&
      producto.precio >= min &&
      producto.precio <= max &&
      (!filtros.disponibles || producto.disponible) &&
      (texto === '' || producto.busqueda.includes(texto)),
  )
}
