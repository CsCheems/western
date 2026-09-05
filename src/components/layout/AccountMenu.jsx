import { Bookmark, LayoutDashboard, LogOut, Package, User, UserRound } from 'lucide-react'
import { useCallback, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { accountMenu, authToasts } from '../../data/auth'
import { useDismissable } from '../../hooks/useDismissable'
import { Frame } from '../ui/Frame'
import { IconButton } from '../ui/IconButton'

// Los datos guardan una clave y el componente resuelve el icono, igual que en
// PromiseRow y LegalBar.
const ICONS = { orders: Package, saved: Bookmark, profile: UserRound, admin: LayoutDashboard }

const ITEM =
  'flex w-full items-center gap-[10px] px-[14px] py-[11px] text-[12px] tracking-wide uppercase transition-colors'

const ITEM_TONES = {
  // Navegación: relleno tenue de ante, el mismo hover de la placa de talleres.
  link: 'text-paper hover:bg-buck/10 hover:text-gold',
  // Cerrar sesión: lavado de granero con texto hueso. El texto no va en óxido
  // —3.6:1 sobre el panel, corto para 12px—; el aviso lo da el fondo.
  danger: 'text-sand hover:bg-barn/35 hover:text-bone',
}

/**
 * Botón de cuenta del navbar. Sin sesión abre el modal de acceso; con sesión
 * despliega el menú.
 *
 * El botón se renderiza siempre en la misma posición del árbol, tenga o no
 * sesión: si cada rama montara el suyo, al cerrar sesión React cambiaría el
 * elemento y el foco se perdería justo cuando se lo acabamos de devolver.
 *
 * Como el menú móvil del navbar usa el mismo hook, abrir uno cierra el otro sin
 * que haya que coordinarlos: el `pointerdown` sobre este botón cae fuera del
 * panel del otro.
 */
export function AccountMenu() {
  const { user, status, openAuth, logout } = useAuth()
  const { pushToast } = useToast()

  const [open, setOpen] = useState(false)
  const panelId = useId()

  const close = useCallback(() => setOpen(false), [])
  const { triggerRef, panelRef } = useDismissable({ open, onClose: close })

  // Al cerrar desde dentro del panel el foco se quedaría en el aire: vuelve al
  // botón, que es de donde salió.
  const closeAndReturn = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [triggerRef])

  const signOut = useCallback(async () => {
    closeAndReturn()

    try {
      await logout()
      pushToast(authToasts.logout)
    } catch {
      // La sesión ya está cerrada de este lado —el provider lo hace pase lo que
      // pase—, pero el servidor no se enteró y conviene decirlo.
      pushToast(authToasts.logoutLocalOnly)
    }
  }, [closeAndReturn, logout, pushToast])

  // Mientras no se sepa si hay sesión no se puede pintar el icono de «entrar»:
  // sería afirmar que no la hay antes de saberlo, y cambiaría a las iniciales en
  // cuanto llegara la respuesta. Se reserva el hueco exacto del IconButton —38px
  // y `shrink-0`, como el resto de la fila— para que el navbar no se mueva. En
  // local dura un fotograma; con red lenta es la diferencia entre un parpadeo y
  // una mentira.
  if (status === 'checking') {
    return <span aria-hidden="true" className="block h-[38px] w-[38px] shrink-0" />
  }

  return (
    <>
      <IconButton
        ref={triggerRef}
        aria-label={user ? `Mi cuenta · ${user.nombre}` : 'Mi cuenta'}
        aria-expanded={user ? open : undefined}
        aria-controls={user && open ? panelId : undefined}
        onClick={user ? () => setOpen((shown) => !shown) : () => openAuth('login')}
      >
        {user ? (
          <span className="text-[12px] tracking-[.06em] text-gold">
            {`${user.nombre[0]}${user.apellido[0]}`.toUpperCase()}
          </span>
        ) : (
          <User size={17} strokeWidth={1.5} />
        )}
      </IconButton>

      {/* La posición va en un envoltorio, no en el marco: Frame lleva `relative`
          fijo en su className —lo necesita para sus marcas— y en la hoja de
          estilos `.relative` se emite después de `.absolute`, así que gana la
          cascada y un `absolute` pasado por className se ignora sin más.

          El envoltorio cuelga de la fila del navbar (que es `relative`), no del
          botón: el botón no está pegado al borde —lleva la bolsa y la
          hamburguesa detrás—, así que 230px colgando de él se salen por la
          izquierda a 360px de ancho. Contra la fila, `right-gutter` cae justo
          sobre el borde derecho del contenido a cualquier ancho. */}
      {user && open && (
        <div className="absolute top-[calc(100%+10px)] right-gutter w-[230px]">
          <Frame
            ref={panelRef}
            id={panelId}
            markClass="text-gold"
            className="animate-panel-in border-buck/45 bg-panel"
          >
            <div className="px-[14px] py-[13px]">
              <p className="truncate text-[13px] text-paper">{`${user.nombre} ${user.apellido}`}</p>
              <p className="mt-[3px] truncate text-[11px] text-sand">{user.email}</p>
            </div>

            <div className="h-px bg-buck/28" />

            <div className="py-[5px]">
              {/* Las entradas marcadas `soloAdmin` solo salen para quien
                  administra. Esconderlas no protege nada —la ruta se escribe a
                  mano y quien la para es el servidor—: es que enseñarle a una
                  clienta una puerta que le van a cerrar no la informa de nada. */}
              {accountMenu.map((item) => {
                if (item.soloAdmin && user.rol !== 'admin') return null

                const Icon = ICONS[item.icon]

                // Ruta del sitio o ancla: lo primero navega con el router y sin
                // recargar; lo segundo sigue siendo un `#` mientras esas
                // páginas no existan. El resto —icono, tono, cierre del
                // panel— es idéntico en los dos casos.
                const Tag = item.to ? Link : 'a'
                const target = item.to ? { to: item.to } : { href: item.href }

                return (
                  <Tag
                    key={item.label}
                    {...target}
                    onClick={closeAndReturn}
                    className={`${ITEM} ${ITEM_TONES.link}`}
                  >
                    <Icon size={15} strokeWidth={1.5} className="shrink-0" />
                    {item.label}
                  </Tag>
                )
              })}
            </div>

            <div className="h-px bg-buck/28" />

            <button
              type="button"
              onClick={signOut}
              className={`${ITEM} cursor-pointer ${ITEM_TONES.danger}`}
            >
              <LogOut size={15} strokeWidth={1.5} className="shrink-0" />
              Cerrar sesión
            </button>
          </Frame>
        </div>
      )}
    </>
  )
}
