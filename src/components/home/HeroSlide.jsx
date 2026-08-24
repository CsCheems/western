import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Frame } from '../ui/Frame'
import { ImageSlot } from '../ui/ImageSlot'

/**
 * Slide del hero: foto a sangre bajo dos capas —el duotono de cuero y el
 * degradado hacia la derecha— y encima la placa de copy enmarcada.
 */
export function HeroSlide({ slide }) {
  return (
    <div className="relative h-full w-full shrink-0 grow-0 basis-full">
      <div className="absolute inset-0 overflow-hidden">
        <ImageSlot src={slide.photo} alt={slide.photoAlt} className="bg-panel" labelClass="text-sand" />
        {/* El duotono es identidad de marca, no un efecto decorativo. */}
        <div className="pointer-events-none absolute inset-0 bg-leather mix-blend-color" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(96deg,rgba(30,27,23,.95)_0%,rgba(30,27,23,.78)_40%,rgba(30,27,23,.18)_100%)]" />
      </div>

      <div className="relative mx-auto flex h-full max-w-shell items-center px-gutter">
        <Frame
          markClass="text-gold"
          className="max-w-[600px] border-buck/50 p-[clamp(26px,3vw,46px)]"
        >
          <span className="block text-[12px] tracking-kicker text-gold uppercase">
            {slide.kicker}
          </span>
          <div className="mt-[14px] mb-[22px] h-px bg-buck/40" />
          <h1 className="font-display text-h1 font-normal text-paper">{slide.title}</h1>
          <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-dust">{slide.body}</p>
          <div className="mt-[30px] flex flex-wrap gap-3">
            <Button href={slide.primary.href} className="px-6 py-[14px]">
              {slide.primary.label}
              <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
            <Button href={slide.secondary.href} variant="outline" className="px-6 py-[14px]">
              {slide.secondary.label}
            </Button>
          </div>
        </Frame>
      </div>
    </div>
  )
}
