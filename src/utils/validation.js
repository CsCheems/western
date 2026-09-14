import { authFields, validationMessages as MSG } from '../data/auth'
import { PASSWORD_GROUP, profileEditFields } from '../data/profile'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const MIN_PASSWORD = 8

// Se cuentan dígitos, no caracteres: «81 1234 5678» y «81-1234-5678» son
// teléfonos perfectamente escritos y rechazarlos sería una pedantería.
const digits = (value) => value.replace(/\D/g, '')

// Reglas de formato por nombre de campo. Reciben el valor ya no vacío y
// devuelven el mensaje del error o null. Un campo sin regla solo se comprueba
// como obligatorio.
const FORMAT = {
  email: (value) => (EMAIL.test(value) ? null : MSG.email),
  telefono: (value) => (digits(value).length === 10 ? null : MSG.telefono),
  codigoPostal: (value) => (digits(value).length === 5 ? null : MSG.codigoPostal),
}

// El mínimo de longitud solo aplica a una contraseña que se está eligiendo: en
// el login ya existe y decirle a alguien que «necesita 8 caracteres» al entrar
// es ruido.
const minPasswordRule = (value) => (value.length >= MIN_PASSWORD ? null : MSG.passwordShort)

// La contraseña no se recorta: los espacios son parte de ella.
const read = (values, field) => {
  const raw = values[field.name] ?? ''
  return field.type === 'password' ? raw : raw.trim()
}

/**
 * Valida una lista de campos y devuelve `{ campo: 'mensaje' }`. Objeto vacío =
 * formulario válido. El orden de las claves sigue al de los campos, así que la
 * primera entrada es siempre el campo que debe recibir el foco.
 *
 * - `minPassword`: el campo `password` exige la longitud mínima.
 * - `matchPassword`: `password` y `confirmPassword` tienen que coincidir.
 *
 * Los campos `readOnly` no se validan: no se pueden corregir, y tampoco se
 * envían.
 */
export function validateFields(fields, values, { minPassword = false, matchPassword = false } = {}) {
  const errors = {}

  for (const field of fields) {
    if (field.readOnly) continue

    const value = read(values, field)

    if (!value) {
      errors[field.name] = MSG.required
      continue
    }

    const rule = FORMAT[field.name] ?? (minPassword && field.name === 'password' ? minPasswordRule : null)
    const message = rule?.(value)

    if (message) errors[field.name] = message
  }

  // Regla cruzada: solo tiene sentido cuando ambas contraseñas están puestas,
  // si no pisaría el «campo obligatorio» de la confirmación.
  if (
    matchPassword &&
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = MSG.passwordMismatch
  }

  return errors
}

/** Una vista del modal de acceso: `login` o `register`. */
export function validate(view, values) {
  const choosing = view === 'register'

  return validateFields(authFields[view], values, {
    minPassword: choosing,
    matchPassword: choosing,
  })
}

// Los campos de la edición sin el grupo de contraseñas, para cuando no se toca.
const PROFILE_WITHOUT_PASSWORD = profileEditFields.filter(
  (field) => !PASSWORD_GROUP.includes(field.name),
)

/**
 * La edición del perfil: las mismas reglas que el alta, con la contraseña como
 * grupo opcional. Si sus tres campos están vacíos, no se validan y la
 * contraseña no cambia; en cuanto se escribe en uno, los tres son obligatorios.
 *
 * Espejo del `optionalGroup` de updateMeSchema en backend/validation/
 * auth.schema.js. Si una regla cambia, cambian las dos.
 */
export function validateProfile(values) {
  const changingPassword = PASSWORD_GROUP.some((name) => values[name])

  return validateFields(changingPassword ? profileEditFields : PROFILE_WITHOUT_PASSWORD, values, {
    minPassword: true,
    matchPassword: true,
  })
}
