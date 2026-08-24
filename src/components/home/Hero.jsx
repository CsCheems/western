import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '../../data/heroSlides'
import { useLoopCarousel } from '../../hooks/useLoopCarousel'
import { CarouselDots } from '../ui/CarouselDots'
import { IconButton } from '../ui/IconButton'
import { HeroSlide } from './HeroSlide'

const AUTOPLAY_MS = 6500

/** Hero con carrusel en loop: autoplay pausable, flechas y puntos. */
export function Hero() {
  const { trackRef, order, index, next, prev, goTo, pause, resume } = useLoopCarousel(
    heroSlides.length,
    { autoplayMs: AUTOPLAY_MS },
  )

  return (
    <section
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-roledescription="carrusel"
      aria-label="Destacados de temporada"
    >
      <div className="h-[clamp(420px,76vh,740px)] overflow-hidden md:h-[clamp(560px,76vh,740px)]">
        <div ref={trackRef} className="flex h-full">
          {order.map((i) => (
            <HeroSlide key={heroSlides[i].id} slide={heroSlides[i]} />
          ))}
        </div>
      </div>

      <IconButton
        tone="gold"
        size="lg"
        aria-label="Anterior"
        onClick={prev}
        className="absolute top-1/2 left-[clamp(10px,1.6vw,22px)] -translate-y-1/2"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </IconButton>
      <IconButton
        tone="gold"
        size="lg"
        aria-label="Siguiente"
        onClick={next}
        className="absolute top-1/2 right-[clamp(10px,1.6vw,22px)] -translate-y-1/2"
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </IconButton>

      <CarouselDots
        count={heroSlides.length}
        index={index}
        onSelect={goTo}
        label="Diapositiva"
        className="absolute right-0 bottom-[26px] left-0"
      />
    </section>
  )
}
