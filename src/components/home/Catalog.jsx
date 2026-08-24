import { ChevronLeft, ChevronRight } from 'lucide-react'
import { productPages } from '../../data/products'
import { useLoopCarousel } from '../../hooks/useLoopCarousel'
import { CarouselDots } from '../ui/CarouselDots'
import { IconButton } from '../ui/IconButton'
import { ProductCard } from './ProductCard'

const pad = (n) => String(n).padStart(2, '0')

/** Catálogo: carrusel de páginas 3×2, seis piezas por página. */
export function Catalog() {
  const { trackRef, order, index, next, prev, goTo } = useLoopCarousel(productPages.length)

  return (
    <section
      id="catalogo"
      className="bg-paper px-gutter py-[clamp(52px,6vw,86px)] text-ink"
      aria-roledescription="carrusel"
      aria-label="Catálogo de temporada"
    >
      <div className="mx-auto max-w-shell">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div>
            <span className="block text-[12px] tracking-kicker text-barn uppercase">
              05 · Catálogo
            </span>
            <h2 className="mt-3 font-display text-h2 font-normal text-ink">
              Doce piezas de temporada
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] tracking-label text-stone">
              {pad(index + 1)} / {pad(productPages.length)}
            </span>
            <div className="flex gap-2">
              <IconButton tone="paper" size="md" aria-label="Página anterior" onClick={prev}>
                <ChevronLeft size={17} strokeWidth={1.5} />
              </IconButton>
              <IconButton tone="paper" size="md" aria-label="Página siguiente" onClick={next}>
                <ChevronRight size={17} strokeWidth={1.5} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="mt-[26px] mb-[44px] h-px bg-rail/28" />

        {/* -mx-2 px-2: aire para que las marcas de registro de las tarjetas,
            que sobresalen 6px, no queden recortadas por el overflow. */}
        <div className="-mx-2 overflow-hidden px-2">
          <div ref={trackRef} className="flex">
            {order.map((i) => (
              <div
                key={productPages[i].id}
                className="grid shrink-0 grow-0 basis-full grid-cols-1 gap-[clamp(22px,2.4vw,36px)] sm:grid-cols-2 lg:grid-cols-3"
              >
                {productPages[i].items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <CarouselDots
          count={productPages.length}
          index={index}
          onSelect={goTo}
          tone="paper"
          label="Página"
          className="mt-[44px]"
        />
      </div>
    </section>
  )
}
