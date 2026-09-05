import { authFields, validationMessages as MSG } from '../data/auth'

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

// El mínimo de longitud solo aplica al alta: en el login la contraseña ya
// existe y decirle a alguien que «necesita 8 caracteres» al entrar es ruido.
const REGISTER_ONLY = {
  password: (value) => (value.length >= MIN_PASSWORD ? null : MSG.passwordShort),
}

// La contraseña no se recorta: los espacios son parte de ella.
const read = (values, field) => {
  const raw = values[field.name] ?? ''
  return field.type === 'password' ? raw : raw.trim()
}

/**
 * Valida una vista completa y devuelve `{ campo: 'mensaje' }`. Objeto vacío =
 * formulario válido. El orden de las claves sigue al de los campos, así que la
 * primera entrada es siempre el campo que debe recibir el foco.
 */
export function validate(view, values) {
  const errors = {}

  for (const field of authFields[view]) {
    const value = read(values, field)

    if (!value) {
      errors[field.name] = MSG.required
      continue
    }

    const rule = FORMAT[field.name] ?? (view === 'register' ? REGISTER_ONLY[field.name] : null)
    const message = rule?.(value)

    if (message) errors[field.name] = message
  }

  // Regla cruzada: solo tiene sentido cuando ambas contraseñas están puestas,
  // si no pisaría el «campo obligatorio» de la confirmación.
  if (
    view === 'register' &&
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = MSG.passwordMismatch
  }

  return errors
}
