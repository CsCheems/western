import { ENDPOINTS } from './endpoints'
import { http } from './http'

// Las tres lecturas del panel. Como services/auth.js: traducen argumentos a
// petición y no tocan los errores — http.js ya los normaliza a ApiError, y aquí
// llegan dos que importan y no existían antes:
//
//   401 not_authenticated · la sesión se acabó mientras mirabas el panel
//   403 not_allowed       · sigues dentro, pero tu cuenta ya no administra
//
// Quien decide qué hacer con cada uno es la vista, no este archivo.
//
// Las tres reciben `signal` y lo pasan tal cual: es lo que permite a
// useApiResource abortar la petición al desmontar.

export function getSummary(options) {
  return http.get(ENDPOINTS.admin.summary, options)
}

export function getCategories(options) {
  return http.get(ENDPOINTS.admin.categories, options)
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
