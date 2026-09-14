import { ENDPOINTS } from './endpoints'
import { http } from './http'

// Las marcas que enseña la tienda: `{ marcas: [{ id, label }] }`, solo las que
// tienen algo publicado y en el orden de la base.
//
// SE PIDE UNA SOLA VEZ POR CARGA DE PÁGINA, con el mismo trato que
// services/ubicaciones.js: el navbar está en todas las páginas y la banda de la
// portada la vuelve a pedir, y la lista no cambia mientras se navega. Se guarda
// la PROMESA, así los dos comparten la misma petición; si falla, se olvida y la
// siguiente vuelve a intentarlo.
//
// Por eso tampoco recibe el `signal` de useApiResource: la petición es de todos,
// y no la puede cancelar un componente que se desmonta.

let pendiente = null

export function getMarcas() {
  pendiente ??= http.get(ENDPOINTS.marcas).catch((error) => {
    pendiente = null
    throw error
  })

  return pendiente
}
