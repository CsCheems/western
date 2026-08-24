import { paymentMethods, socialLinks } from '../../data/site'
import { InstagramGlyph, WhatsappGlyph, YoutubeGlyph } from '../ui/SocialIcons'

const ICONS = {
  instagram: InstagramGlyph,
  youtube: YoutubeGlyph,
  whatsapp: WhatsappGlyph,
}

/** Barra legal: copyright, medios de pago y redes. */
export function LegalBar() {
  return (
    <div className="border-t border-rail">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-5 px-gutter py-[22px]">
        <span className="text-[12px] tracking-[.1em] text-sand">
          © 2026 Rincón del Oeste · Saltillo, Coahuila
        </span>

        <div className="flex flex-wrap items-center gap-4 text-[11px] tracking-wide text-sand uppercase">
          {paymentMethods.map((method) => (
            <span key={method}>{method}</span>
          ))}
        </div>

        <div className="flex gap-[14px]">
          {socialLinks.map((social) => {
            const Icon = ICONS[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="grid h-[34px] w-[34px] place-items-center border border-rail text-buck transition-colors hover:border-gold"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
