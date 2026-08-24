import { RefreshCw, Shield, Truck } from 'lucide-react'
import { promises } from '../../data/site'

const ICONS = { truck: Truck, shield: Shield, refresh: RefreshCw }

/** Fila de promesas del footer: envío, garantía y cambios. */
export function PromiseRow() {
  return (
    <div className="mx-auto grid max-w-shell grid-cols-1 gap-[clamp(16px,2vw,32px)] border-b border-rail px-gutter py-[clamp(20px,2.4vw,30px)] sm:grid-cols-3">
      {promises.map((promise) => {
        const Icon = ICONS[promise.icon]
        return (
          <div key={promise.title} className="flex items-center gap-[14px]">
            <Icon size={22} strokeWidth={1.5} className="shrink-0 text-gold" />
            <div>
              <div className="text-[13px] tracking-[.14em] text-paper uppercase">
                {promise.title}
              </div>
              <div className="mt-[3px] text-[12px] text-sand">{promise.note}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
