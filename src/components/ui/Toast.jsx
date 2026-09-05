import { AlertTriangle, Check, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Frame } from './Frame'

const LIFETIME = 4500
const TRANSITION = 220

const TONES = {
  // Confirmación: oro sobre panel, 8.3:1. La misma voz que los CTA del sitio.
  success: {
    rule: 'bg-gold',
    icon: 'text-gold',
    mark: 'text-gold',
    title: 'text-gold',
    border: 'border-buck/45',
    Icon: Check,
  },
  // Error: el filete va en óxido, no en granero. Granero sobre panel da 1.75:1
  // y sencillamente no se ve. El texto nunca va en óxido —3.6:1, corto para
  // 12px—: el aviso lo dan el filete y el icono.
  error: {
    rule: 'bg-rust',
    icon: 'text-rust',
    mark: 'text-rust',
    title: 'text-bone',
    border: 'border-rust/60',
    Icon: AlertTriangle,
  },
}

/**
 * Aviso suelto. Se cierra solo a los 4.5s, pero el reloj se detiene mientras el
 * puntero o el foco están encima: si alguien se acerca a leerlo o a cerrarlo,
 * el aviso no se le escapa.
 */
function Toast({ toast, onDismiss }) {
  const tone = TONES[toast.tone] ?? TONES.success
  const { Icon } = tone

  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [paused, setPaused] = useState(false)

  const exitTimer = useRef(null)

  // Un frame de retraso para que el navegador pinte el estado inicial y la
  // transición de entrada tenga desde dónde salir.
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const dismiss = useCallback(() => {
    setLeaving(true)
    exitTimer.current = setTimeout(() => onDismiss(toast.id), TRANSITION)
  }, [onDismiss, toast.id])

  useEffect(() => {
    if (paused || leaving) return
    const id = setTimeout(dismiss, LIFETIME)
    return () => clearTimeout(id)
  }, [paused, leaving, dismiss])

  useEffect(() => () => clearTimeout(exitTimer.current), [])

  const visible = entered && !leaving

  return (
    <Frame
      markClass={tone.mark}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`pointer-events-auto w-[min(340px,calc(100vw-32px))] bg-panel transition-[opacity,transform] duration-[220ms] ease-track ${tone.border} ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-[2px] ${tone.rule}`} />

      <div className="flex items-start gap-[10px] py-[13px] pr-[8px] pl-[16px]">
        <Icon size={15} strokeWidth={1.5} className={`mt-px shrink-0 ${tone.icon}`} />

        <div className="min-w-0 flex-1">
          <p className={`text-[12px] tracking-wide uppercase ${tone.title}`}>{toast.title}</p>
          {toast.body && (
            <p className="mt-[5px] text-[12px] leading-[1.45] text-dust">{toast.body}</p>
          )}
        </div>

        <button
          type="button"
          aria-label="Cerrar aviso"
          onClick={dismiss}
          className="grid h-[22px] w-[22px] shrink-0 cursor-pointer place-items-center text-sand transition-colors hover:text-paper"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>
    </Frame>
  )
}

/**
 * Pila de avisos arriba a la izquierda, el más reciente arriba.
 *
 * Se renderiza siempre, aunque esté vacía: una región `aria-live` tiene que
 * existir en el DOM antes de recibir contenido o el lector de pantalla no
 * anuncia lo que aparece dentro.
 */
export function ToastViewport({ toasts, onDismiss }) {
  return createPortal(
    <div
      aria-live="polite"
      className="pointer-events-none fixed top-4 left-4 z-[60] flex flex-col gap-[10px]"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  )
}
