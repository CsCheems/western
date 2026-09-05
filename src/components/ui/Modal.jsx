import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useLoginModal } from '../../hooks/useLoginModal'
import { Frame } from './Frame'
import { IconButton } from './IconButton'

/**
 * Diálogo modal: overlay oscuro y panel enmarcado.
 *
 * Va por portal a `document.body` por obligación, no por gusto: el header tiene
 * `backdrop-blur` y el contenedor de Home `overflow-x-hidden`, y cada uno crea
 * un contexto de apilamiento y de recorte que dejaría el modal por debajo o
 * cortado. El header es `z-30`, el máximo del sitio; el overlay va en `z-50`.
 *
 * El panel no lleva `overflow-hidden` a propósito: recortaría las cuatro marcas
 * de registro del marco. El scroll del contenido lo pone quien lo consume, en
 * un hijo.
 */
export function Modal({ open, onClose, labelledBy, className = '', children }) {
  const panelRef = useLoginModal({ open, onClose })

  if (!open) return null

  // Cierre por overlay en `mousedown` y comprobando el objetivo: con `click` un
  // arrastre que empieza dentro del panel y suelta fuera cerraría el diálogo.
  const onBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <div
      onMouseDown={onBackdrop}
      className="animate-overlay-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-[6px] sm:items-center"
    >
      {/* React 19 pasa `ref` como prop normal, así que Frame la reenvía sola
          junto al resto de props. */}
      <Frame
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        markClass="text-gold"
        className={`animate-panel-in flex max-h-[calc(100dvh-32px)] w-full flex-col border-buck/45 bg-panel ${className}`}
      >
        <IconButton
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-[14px] right-[14px] z-10"
        >
          <X size={17} strokeWidth={1.5} />
        </IconButton>

        {children}
      </Frame>
    </div>,
    document.body,
  )
}
