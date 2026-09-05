import { useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { authToasts, authViews } from '../../data/auth'
import { useAuthForm } from '../../hooks/useAuthForm'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'

/**
 * El formulario de las dos vistas. Ambas son lo mismo —secciones de campos y un
 * botón—, así que se recorre `authViews[view].sections` en vez de mantener dos
 * componentes casi idénticos: añadir un campo es editar data/auth.js.
 */
export function AuthForm({ view, titleId }) {
  const { signIn, signUp, closeAuth } = useAuth()
  const { pushToast } = useToast()

  const copy = authViews[view]
  const isLogin = view === 'login'

  const onInvalid = useCallback(() => pushToast(authToasts.invalid), [pushToast])

  const onSubmit = useCallback(
    async (values) => {
      try {
        const user = isLogin ? await signIn(values) : await signUp(values)
        const done = isLogin ? authToasts.loginSuccess : authToasts.registerSuccess

        pushToast({ tone: done.tone, title: done.title, body: done.body(user) })
        closeAuth()
      } catch (error) {
        pushToast({
          tone: authToasts.failure.tone,
          title: authToasts.failure.title,
          body: error.message,
        })
        // Se relanza para que useAuthForm coloque el mensaje bajo su campo.
        throw error
      }
    },
    [isLogin, signIn, signUp, pushToast, closeAuth],
  )

  const { formRef, values, errors, pending, handleChange, handleSubmit } = useAuthForm({
    view,
    onSubmit,
    onInvalid,
  })

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-busy={pending} noValidate>
      <span className="block text-[12px] tracking-kicker text-gold uppercase">{copy.kicker}</span>
      <h2 id={titleId} className="mt-[10px] font-display text-h3 font-normal text-paper">
        {copy.title}
      </h2>
      <p className="mt-3 text-[13px] leading-[1.55] text-sand">{copy.intro}</p>

      {copy.sections.map((section, i) => (
        <div key={section.title ?? 'principal'} className={i === 0 ? 'mt-7' : 'mt-6'}>
          {section.title && (
            <div className="mb-4 flex items-center gap-3">
              <span className="shrink-0 text-[11px] tracking-label text-buck uppercase">
                {section.title}
              </span>
              <span className="h-px flex-1 bg-buck/28" />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {section.fields.map((field) => (
              <Field
                key={field.name}
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                disabled={pending}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      ))}

      <Button
        type="submit"
        disabled={pending}
        className="relative mt-7 w-full overflow-hidden py-[14px]"
      >
        {pending ? copy.pending : copy.submit}

        {/* La espera: un filete de 1px barriendo el borde inferior. Nada de
            puntos ni de ruedas girando. */}
        {pending && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
            <span className="block h-px w-2/5 animate-sweep bg-gold" />
          </span>
        )}
      </Button>

      <p className="mt-4 text-[11px] leading-[1.5] text-sand">{copy.note}</p>
    </form>
  )
}
