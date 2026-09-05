import { ArrowRight } from 'lucide-react'
import { catalogCopy } from '../../data/catalog'
import { formatMoney } from '../../utils/format'
import { Frame } from '../ui/Frame'
import { ImageSlot } from '../ui/ImageSlot'

/**
 * Tarjeta del catálogo. HERMANA de home/ProductCard y no una variante suya, por
 * tres razones que valen por separado:
 *
 *   · Las formas de dato no se solapan. Allí `price` es '$4,290' y aquí `precio`
 *     es 4290; allí `category` es el rótulo 'Calzado' y aquí `categoria` es el id
 *     'botas', que hay que resolver contra las facetas. Compartir componente
 *     obligaría a una unión de las dos formas dentro, que es exactamente donde
 *     las dos vistas empezarían a divergir detrás de un if.
 *   · La acción es otra cosa: «añadir a la bolsa» es un botón de verdad y «ver
 *     detalles» todavía no lleva a ningún sitio. Pasarla por prop dejaría a la
 *     tarjeta sin saber qué es.
 *   · Van a divergir a propósito: la de portada es un anzuelo escogido a mano.
 *
 * Se ven idénticas, que es el objetivo — formatMoney(4290) da '$4,290', carácter
 * por carácter la misma cadena que la portada escribe a mano.
 *
 * Los rótulos llegan ya resueltos desde la retícula, que tiene los mapas de las
 * facetas: la tarjeta no busca nada.
 */
export function CatalogCard({ product, categoria, genero }) {
  return (
    <Frame
      as="article"
      markClass="text-leather"
      className="group flex flex-col border-rail/30 bg-transparent transition-colors hover:border-leather"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-plate">
        <ImageSlot src={product.foto} alt={product.titulo} />
        {/* El duotono de cuero es identidad de marca, no un efecto decorativo. */}
        <div className="pointer-events-none absolute inset-0 bg-leather opacity-55 mix-blend-color" />
      </div>

      <div className="flex flex-1 flex-col gap-[9px] px-[18px] pt-4 pb-5">
        {/* Qué es la pieza y, cuando lo lleva, para quién. Una sola línea, la
            misma que en la portada ocupa la categoría. */}
        <span className="text-[11px] tracking-label text-leather uppercase">
          {genero ? `${categoria} · ${genero}` : categoria}
        </span>

        <h3 className="text-[18px] leading-[1.25] font-semibold tracking-[.01em] text-ink">
          {product.titulo}
        </h3>

        <p className="text-[13px] leading-[1.5] text-stone">{product.descripcion}</p>

        <div className="mt-auto flex items-baseline gap-[10px] pt-3">
          <span className="text-[20px] font-semibold tracking-[.02em] text-barn">
            {formatMoney(product.precio)}
          </span>

          {/* Sin insignia sobre la foto: lo agotado se dice donde se dice la
              moneda. Hay que decirlo en alguna parte —por omisión el catálogo sí
              enseña lo que no hay, y para eso existe el filtro «solo
              disponibles»—, pero una placa encima de la imagen es otra cosa. */}
          <span className="text-[12px] tracking-[.1em] text-stone">
            {product.disponible ? catalogCopy.moneda : catalogCopy.agotado}
          </span>
        </div>

        {/* Leyenda y no botón: todavía no lleva a ningún sitio, y un botón que no
            hace nada promete más de lo que un rótulo que se enciende con la
            tarjeta. Cuando exista la ficha, esto se vuelve un Link y ya está. */}
        <span className="mt-[8px] inline-flex items-center gap-[6px] self-start border-b border-transparent pb-[2px] text-[12px] tracking-wide text-rail uppercase transition-colors group-hover:border-barn group-hover:text-barn">
          {catalogCopy.verDetalles}
          <ArrowRight size={13} strokeWidth={1.5} />
        </span>
      </div>
    </Frame>
  )
}
