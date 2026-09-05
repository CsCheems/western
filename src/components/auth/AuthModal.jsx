import { useAuth } from '../../context/AuthContext'
import { authHeader, authViews } from '../../data/auth'
import { useFadeSwitch } from '../../hooks/useFadeSwitch'
import { Modal } from '../ui/Modal'
import { AuthForm } from './AuthForm'

const TITLE_ID = 'auth-modal-title'

// Aire lateral del panel, el mismo en cabecera, pestañas y cuerpo.
const PAD = 'px-[clamp(20px,4vw,34px)]'

const TAB =
  'flex-1 cursor-pointer border-b py-[13px] text-[12px] tracking-label uppercase transition-colors'

const TAB_STATE = {
  // Vista activa: regla inferior en oro, el mismo subrayado que el navbar.
  on: 'border-gold text-gold',
  // Vista inactiva: hairline de riel y texto arena, 5.6:1 sobre el panel.
  off: 'border-rail text-sand hover:border-buck hover:text-paper',
}

/**
 * Modal único de acceso. Las pestañas se quedan fijas arriba y todo lo de
 * debajo —rótulo, título y formulario— cruza en fundido, con la altura del
 * panel animándose a la vez: entrar son dos campos y crear cuenta son once, y
 * sin eso el salto sería de varios cientos de píxeles.
 */
export function AuthModal() {
  const { open, view, closeAuth } = useAuth()
  const { boxRef, contentRef, shown, switchTo } = useFadeSwitch(view)

  return (
    <Modal open={open} onClose={closeAuth} labelledBy={TITLE_ID} className="max-w-[560px]">
      <div className={`shrink-0 pt-[clamp(22px,3vw,28px)] pr-[62px] ${PAD}`}>
        <span className="block text-[11px] tracking-kicker text-buck uppercase">{authHeader}</span>
      </div>

      <div role="tablist" className={`mt-[18px] flex shrink-0 ${PAD}`}>
        {Object.entries(authViews).map(([name, copy]) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={name === shown}
            onClick={() => switchTo(name)}
            className={`${TAB} ${name === shown ? TAB_STATE.on : TAB_STATE.off}`}
          >
            {copy.tab}
          </button>
        ))}
      </div>

      {/* El scroll va aquí y no en el marco: el marco recortaría sus cuatro
          marcas de registro. */}
      <div className={`min-h-0 flex-1 overflow-y-auto pt-[26px] pb-[clamp(24px,3vw,32px)] ${PAD}`}>
        <div ref={boxRef}>
          <div ref={contentRef}>
            {/* La `key` reinicia valores y errores al cambiar de vista: lo
                escrito en el login no debe reaparecer en el alta. */}
            <AuthForm key={shown} view={shown} titleId={TITLE_ID} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
