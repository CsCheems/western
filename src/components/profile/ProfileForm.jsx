import { useCallback, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import {
  profileCopy,
  profileEditSections,
  profileSections,
  profileToasts,
  toEditValues,
  toFormValues,
} from '../../data/profile'
import { useForm } from '../../hooks/useForm'
import { validateProfile } from '../../utils/validation'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'
import { Frame } from '../ui/Frame'

// Un marco solo, ancho contenido: es en la página el equivalente del panel del
// modal. Sin límite, los campos se estirarían a lo ancho de la pantalla y un
// «Número» de tres dígitos ocuparía media fila.
const FRAME =
  'mx-auto max-w-[760px] border-buck/45 bg-panel px-[clamp(20px,4vw,38px)] py-[clamp(26px,3.4vw,38px)]'

/**
 * Los datos de la cuenta, en la misma forma con la que se pidieron.
 *
 * No son pares etiqueta/valor: son los campos del alta, con el mismo
 * componente, el mismo orden y la misma retícula de dos columnas —que es lo que
 * hace que el `half` de cada campo caiga donde cae allá—. Consultar y editar
 * son el mismo formulario: en la consulta los campos van en `readOnly`, en la
 * edición se les quita, y aparecen las contraseñas.
 *
 * La edición se desmonta al salir y se vuelve a montar al entrar, así que su
 * estado se siembra siempre desde el usuario actual: cancelar es, literalmente,
 * tirar el estado.
 */
export function ProfileForm({ user, editing, onDone }) {
  return (
    <section className="px-gutter py-[clamp(40px,5vw,72px)]">
      {editing ? <ProfileEditor user={user} onDone={onDone} /> : <ProfileView user={user} />}
    </section>
  )
}

function ProfileView({ user }) {
  const values = toFormValues(user)

  return (
    <Frame
      as="form"
      markClass="text-gold"
      // Aquí no se envía nada, pero el elemento correcto para un grupo de campos
      // es <form>. El preventDefault no es decorativo: sin él, un Enter dentro de
      // cualquier campo dispara el envío implícito del navegador y recarga la
      // página.
      onSubmit={(event) => event.preventDefault()}
      className={FRAME}
    >
      <FormHeading title={profileCopy.formTitle} intro={profileCopy.formIntro} />

      {profileSections.map((section, i) => (
        <FieldSection key={section.title} title={section.title} first={i === 0}>
          {section.fields.map((field) => (
            <Field key={field.name} field={field} value={values[field.name]} readOnly />
          ))}
        </FieldSection>
      ))}
    </Frame>
  )
}

function ProfileEditor({ user, onDone }) {
  const { updateProfile } = useAuth()
  const { pushToast } = useToast()

  const onInvalid = useCallback(() => pushToast(profileToasts.invalid), [pushToast])

  const onSubmit = useCallback(
    async (values) => {
      try {
        await updateProfile(values)
        pushToast(values.password ? profileToasts.passwordChanged : profileToasts.saved)
        onDone()
      } catch (error) {
        pushToast({
          tone: profileToasts.failure.tone,
          title: profileToasts.failure.title,
          body: error.message,
        })
        // Se relanza para que useForm coloque el mensaje bajo su campo.
        throw error
      }
    },
    [updateProfile, pushToast, onDone],
  )

  const { formRef, values, errors, pending, handleChange, handleSubmit, focusField } = useForm({
    initialValues: () => toEditValues(user),
    validate: validateProfile,
    onSubmit,
    onInvalid,
  })

  // Al entrar en edición el foco va al primer campo: quien pulsó «Editar datos»
  // quiere escribir, y el formulario está más abajo en la página.
  useEffect(() => {
    focusField(profileEditSections[0].fields[0].name)
  }, [focusField])

  return (
    <Frame
      as="form"
      ref={formRef}
      markClass="text-gold"
      onSubmit={handleSubmit}
      aria-busy={pending}
      noValidate
      className={FRAME}
    >
      <FormHeading title={profileCopy.editTitle} intro={profileCopy.editIntro} />

      {profileEditSections.map((section, i) => (
        <FieldSection key={section.title} title={section.title} first={i === 0}>
          {section.fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              readOnly={field.readOnly}
              disabled={pending}
              onChange={handleChange}
            />
          ))}
        </FieldSection>
      ))}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Cancelar primero en el DOM y a la izquierda: el orden de lectura
            termina en la acción principal, como el botón del modal. */}
        <Button
          variant="outline"
          disabled={pending}
          onClick={onDone}
          className="py-[14px]"
        >
          {profileCopy.cancel}
        </Button>

        <Button type="submit" disabled={pending} className="relative overflow-hidden py-[14px]">
          {pending ? profileCopy.saving : profileCopy.save}

          {/* La espera: un filete de 1px barriendo el borde inferior, el mismo
              del modal de acceso. */}
          {pending && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
              <span className="block h-px w-2/5 animate-sweep bg-gold" />
            </span>
          )}
        </Button>
      </div>
    </Frame>
  )
}

function FormHeading({ title, intro }) {
  return (
    <>
      <h2 className="font-display text-h3 font-normal text-paper">{title}</h2>
      <p className="mt-3 text-[13px] leading-[1.55] text-sand">{intro}</p>
    </>
  )
}

function FieldSection({ title, first, children }) {
  return (
    <div className={first ? 'mt-8' : 'mt-7'}>
      <div className="mb-4 flex items-center gap-3">
        <span className="shrink-0 text-[11px] tracking-label text-buck uppercase">{title}</span>
        <span className="h-px flex-1 bg-buck/28" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}
