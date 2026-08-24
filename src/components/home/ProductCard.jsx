import { Button } from '../ui/Button'
import { Frame } from '../ui/Frame'
import { ImageSlot } from '../ui/ImageSlot'

const BADGE_TONES = {
  new: 'bg-rust',
  sale: 'bg-barn',
}

/** Tarjeta de producto: marco blueprint sin relleno sobre el fondo de papel. */
export function ProductCard({ product }) {
  return (
    <Frame
      as="article"
      markClass="text-leather"
      className="flex flex-col border-rail/30 bg-transparent transition-colors hover:border-leather"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-plate">
        <ImageSlot src={product.photo} alt={product.photoAlt} />
        <div className="pointer-events-none absolute inset-0 bg-leather opacity-55 mix-blend-color" />
        {product.badge && (
          <span
            className={`absolute top-0 left-0 flex px-[11px] py-[5px] text-[11px] tracking-[.16em] text-bone uppercase ${BADGE_TONES[product.badge.tone]}`}
          >
            {product.badge.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-[9px] px-[18px] pt-4 pb-5">
        <span className="text-[11px] tracking-label text-leather uppercase">
          {product.category}
        </span>
        <h3 className="text-[18px] leading-[1.25] font-semibold tracking-[.01em] text-ink">
          {product.title}
        </h3>
        <p className="text-[13px] leading-[1.5] text-stone">{product.description}</p>

        <div className="mt-auto flex items-baseline gap-[10px] pt-3">
          <span className="text-[20px] font-semibold tracking-[.02em] text-barn">
            {product.price}
          </span>
          {product.was ? (
            <span className="text-[13px] text-stone line-through">{product.was}</span>
          ) : (
            <span className="text-[12px] tracking-[.1em] text-stone">MXN</span>
          )}
        </div>

        <Button variant="quiet" className="mt-[6px] w-full py-[11px]">
          Añadir a la bolsa
        </Button>
      </div>
    </Frame>
  )
}
