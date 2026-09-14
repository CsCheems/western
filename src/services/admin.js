import { ENDPOINTS } from './endpoints'
import { http } from './http'

// Lo que el panel pide y escribe. Como services/auth.js: traducen argumentos a
// petición y no tocan los errores — http.js ya los normaliza a ApiError, y aquí
// llegan dos que importan:
//
//   401 not_authenticated · la sesión se acabó mientras mirabas el panel
//   403 not_allowed       · sigues dentro, pero tu cuenta ya no administra
//
// Quien decide qué hacer con cada uno es la vista, no este archivo.
//
// Las lecturas reciben `options` y lo pasan tal cual: es lo que permite a
// useApiResource abortar la petición al desmontar.

export function getSummary(options) {
  return http.get(ENDPOINTS.admin.summary, options)
}

export function getCategories(options) {
  return http.get(ENDPOINTS.admin.categories, options)
}

// Categorías con sus marcas y si llevan género o fieltro, marcas, géneros y
// fieltros: todo lo que el formulario de artículo necesita para sus selectores.
export function getCatalogos(options) {
  return http.get(ENDPOINTS.admin.catalogos, options)
}

/**
 * El inventario, entero o de una categoría.
 *
 * `categoria` se manda como `params` y no interpolado en la ruta: axios lo
 * codifica y —lo que aquí importa— omite el parámetro entero cuando el valor es
 * undefined, que es exactamente lo que el servidor entiende por «todo».
 *
 * Una categoría que no existe responde 404, no una lista vacía.
 */
export function getProducts(categoria, options) {
  return http.get(ENDPOINTS.admin.products, { ...options, params: { categoria } })
}

// Los archivados: una lista aparte, sin filtro de categoría.
export function getArchivedProducts(options) {
  return http.get(ENDPOINTS.admin.products, { ...options, params: { archivados: 1 } })
}

// Un artículo con su galería completa. 404 si el slug no existe.
export function getProduct(id, options) {
  return http.get(ENDPOINTS.admin.product(id), options)
}

/**
 * El cuerpo se arma nombrando campos, igual que el alta de cuenta: un campo que
 * solo sea de la interfaz no empieza a subirse solo.
 *
 * Género y fieltro viajan vacíos cuando no aplican: el servidor los recibe como
 * «no hay» y rechaza los que sobran. Precio y stock van como texto, tal cual se
 * escribieron; es el servidor quien los valida y los convierte.
 */
function toProductBody(values) {
  return {
    titulo: values.titulo,
    descripcion: values.descripcion,
    categoria: values.categoria,
    marca: values.marca,
    genero: values.genero,
    fieltro: values.fieltro,
    precio: values.precio,
    stock: values.stock,
    publicado: values.publicado,
    enPortada: values.enPortada,
  }
}

// Devuelve el artículo creado, con el slug que le asignó el servidor.
export function createProduct(values) {
  return http.post(ENDPOINTS.admin.products, toProductBody(values))
}

export function updateProduct(id, values) {
  return http.put(ENDPOINTS.admin.product(id), toProductBody(values))
}

// Archivar es el DELETE de la API: la fila se conserva y se puede restaurar.
export function archiveProduct(id) {
  return http.delete(ENDPOINTS.admin.product(id))
}

export function restoreProduct(id) {
  return http.post(ENDPOINTS.admin.restore(id))
}

/**
 * Sube UNA imagen y devuelve el artículo con la galería ya actualizada.
 *
 * El File viaja crudo como cuerpo, con su tipo en Content-Type: ni JSON ni
 * multipart, que es lo que el servidor lee con express.raw. Timeout propio de un
 * minuto: los 12 s por omisión están pensados para un JSON, no para 5 MB por
 * una conexión lenta.
 */
export function uploadProductImage(id, file) {
  return http.post(ENDPOINTS.admin.images(id), file, {
    headers: { 'Content-Type': file.type },
    timeout: 60000,
  })
}

export function setPrincipalImage(id, imagenId) {
  return http.put(ENDPOINTS.admin.principal(id, imagenId))
}

export function removeProductImage(id, imagenId) {
  return http.delete(ENDPOINTS.admin.image(id, imagenId))
}
