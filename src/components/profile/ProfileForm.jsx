import { profileCopy, profileSections, toFormValues } from '../../data/profile'
import { Field } from '../ui/Field'
import { Frame } from '../ui/Frame'

/**
 * Los datos de la cuenta, en la misma forma con la que se pidieron.
 *
 * No son pares etiqueta/valor: son los campos del alta en solo lectura, con el
 * mismo componente, el mismo orden y la misma retícula de dos columnas —que es
 * lo que hace que el `half` de cada campo caiga donde cae allá—. Cuando llegue
 * la edición, editar será quitarles el `readOnly`.
 *
 * Un marco solo, ancho contenido: es en la página el equivalente del panel del
 * modal. Sin límite, los campos se estirarían a lo ancho de la pantalla y un
 * «Número» de tres dígitos ocuparía media fila.
 */
export function ProfileForm({ user }) {
  const values = toFormValues(user)

  return (
    <section className="px-gutter py-[clamp(40px,5vw,72px)]">
      <Frame
        as="form"
        markClass="text-gold"
        // La forma no envía nada todavía, pero el elemento correcto para un
        // grupo de campos es <form>, y es el que va a recibir la lógica. El
        // preventDefault no es decorativo: sin él, un Enter dentro de cualquier
        // campo dispara el envío implícito del navegador y recarga la página.
        onSubmit={(event) => event.preventDefault()}
        className="mx-auto max-w-[760px] border-buck/45 bg-panel px-[clamp(20px,4vw,38px)] py-[clamp(26px,3.4vw,38px)]"
      >
        <h2 className="font-display text-h3 font-normal text-paper">{profileCopy.formTitle}</h2>
        <p className="mt-3 text-[13px] leading-[1.55] text-sand">{profileCopy.formIntro}</p>

        {profileSections.map((section, i) => (
          <div key={section.title} className={i === 0 ? 'mt-8' : 'mt-7'}>
            <div className="mb-4 flex items-center gap-3">
              <span className="shrink-0 text-[11px] tracking-label text-buck uppercase">
                {section.title}
              </span>
              <span className="h-px flex-1 bg-buck/28" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {section.fields.map((field) => (
                <Field key={field.name} field={field} value={values[field.name]} readOnly />
              ))}
            </div>
          </div>
        ))}
      </Frame>
    </section>
  )
}
