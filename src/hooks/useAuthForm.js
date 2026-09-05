import { useCallback, useRef, useState } from 'react'
import { authFields } from '../data/auth'
import { validate } from '../utils/validation'

const emptyValues = (view) => Object.fromEntries(authFields[view].map((f) => [f.name, '']))

/**
 * Estado del formulario de acceso: valores, errores y envío en curso.
 *
 * Se valida al enviar, no al escribir —marcar en rojo un campo que todavía se
 * está tecleando por primera vez es hostil—, pero un campo que ya falló sí se
 * limpia en cuanto se corrige.
 *
 * `onSubmit` recibe los valores y puede lanzar un `ApiError`; si el error trae
 * `field`, el mensaje se coloca bajo ese campo y el foco va ahí.
 */
export function useAuthForm({ view, onSubmit, onInvalid }) {
  const formRef = useRef(null)

  const [values, setValues] = useState(() => emptyValues(view))
  const [errors, setErrors] = useState({})
  const [pending, setPending] = useState(false)

  const focusField = useCallback((name) => {
    formRef.current?.querySelector(`[name="${name}"]`)?.focus()
  }, [])

  const handleChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))

    setErrors((prev) => {
      if (!(name in prev)) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      if (pending) return

      const found = validate(view, values)
      const firstInvalid = Object.keys(found)[0]

      if (firstInvalid) {
        setErrors(found)
        focusField(firstInvalid)
        onInvalid?.()
        return
      }

      setPending(true)

      try {
        await onSubmit(values)
      } catch (error) {
        if (error.field) {
          setErrors({ [error.field]: error.message })
          focusField(error.field)
        }
      } finally {
        setPending(false)
      }
    },
    [view, values, pending, onSubmit, onInvalid, focusField],
  )

  return { formRef, values, errors, pending, handleChange, handleSubmit }
}
