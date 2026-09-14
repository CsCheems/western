import { SquarePen } from 'lucide-react'
import { profileCopy } from '../../data/profile'
import { Button } from '../ui/Button'

/**
 * Cabecera de la página de perfil: quién eres y el botón de editar.
 *
 * Banda sobre `panel` con regla arriba y abajo, el mismo recorte con el que la
 * placa de talleres se separa de lo que tiene encima y debajo.
 *
 * Sin avatar ni hueco reservado para uno: el alta no pide foto, y dejar un
 * cuadro esperando una imagen que nadie va a subir es prometer una función que
 * no existe.
 *
 * Mientras se edita, el botón desaparece: pulsarlo otra vez no haría nada, y
 * las dos salidas de la edición —guardar y cancelar— están en el propio
 * formulario. `editRef` es para que la página le devuelva el foco al salir.
 */
export function ProfileIdentity({ user, editing, onEdit, editRef }) {
  return (
    <section className="border-y border-rail bg-panel px-gutter py-[clamp(34px,4.4vw,58px)]">
      <div className="mx-auto flex max-w-shell flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          <span className="block text-[12px] tracking-kicker text-buck uppercase">
            {profileCopy.kicker}
          </span>

          <h1 className="mt-3 font-display text-h2 font-normal break-words text-paper">
            {`${user.nombre} ${user.apellido}`}
          </h1>

          <p className="mt-[10px] text-[14px] text-sand">{user.email}</p>
        </div>

        {/* En `outline` y no en `solid`: el oro macizo es el CTA de compra del
            sitio, y editar tus datos no es comprar nada. */}
        {!editing && (
          <Button
            ref={editRef}
            variant="outline"
            onClick={onEdit}
            className="shrink-0 px-[22px] py-[13px]"
          >
            <SquarePen size={15} strokeWidth={1.5} />
            {profileCopy.edit}
          </Button>
        )}
      </div>
    </section>
  )
}
