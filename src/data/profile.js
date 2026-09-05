import { authViews } from './auth'

// Copy y estructura de la página de perfil.
//
// La página no muestra pares etiqueta/valor: muestra el MISMO formulario del
// alta con los campos en solo lectura. Cuando llegue la edición, editar será
// quitarles esa propiedad, no construir otra pantalla. Por eso lo que hay aquí
// son campos y no textos.

export const profileCopy = {
  kicker: '01 · Tu cuenta',
  edit: 'Editar datos',
  formTitle: 'Tus datos',
  formIntro: 'Así te tenemos registrada la cuenta. Puedes copiar cualquier dato de aquí.',
}

// Lo que se pide una vez al registrarse y no se enseña después.
//
// La contraseña queda fuera del todo, y no por descuido: un campo de solo
// lectura con ocho puntos dentro no es un dato, es un adorno. Cambiarla será su
// propia acción cuando exista la edición.
//
// Esta lista es el único punto que hay que pensar cuando el alta gane un campo
// —una casilla de términos, por ejemplo, que se acepta al registrarse y no se
// consulta luego—. Todo lo demás aparece solo.
const EXCLUIDOS = new Set(['password', 'confirmPassword'])

/**
 * Las secciones se derivan de las del alta en vez de volver a escribirlas
 * —mismo recurso que `authFields` en data/auth.js o `productPages` en
 * products.js—, así que el perfil y el registro no pueden divergir: los mismos
 * campos, en el mismo orden, con la misma retícula, porque `half` viaja con
 * cada campo.
 */
export const profileSections = authViews.register.sections.map((section) => ({
  title: section.title,
  fields: section.fields.filter((field) => !EXCLUIDOS.has(field.name)),
}))

/**
 * Aplana el usuario de la sesión a los nombres planos que usan los campos: la
 * API devuelve la dirección anidada y el formulario la quiere en una sola capa.
 *
 * Es el reverso exacto del armado que hace register() en services/auth.js, y
 * cuando llegue la edición esto es justo lo que siembra el estado del
 * formulario.
 */
export function toFormValues(user) {
  return {
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    pais: user.direccion.pais,
    estado: user.direccion.estado,
    codigoPostal: user.direccion.codigoPostal,
    colonia: user.direccion.colonia,
    calle: user.direccion.calle,
    numero: user.direccion.numero,
    email: user.email,
  }
}

// Panel para quien llega a /perfil sin sesión. No se redirige a la portada: un
// enlace guardado en marcadores no debe parecer roto, y el modal ya existe.
export const signInInvite = {
  kicker: 'Área de cuenta',
  title: 'Esta página es tuya',
  body: 'Entra para ver los datos de tu cuenta, tus pedidos y lo que dejaste apartado.',
  action: 'Entrar',
}
