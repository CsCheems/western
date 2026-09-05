import { catalogCopy } from '../../data/catalog'
import { Button } from '../ui/Button'
import { Frame } from '../ui/Frame'
import { CatalogCard } from './CatalogCard'

/**
 * La retícula de resultados y, cuando no hay ninguno, la salida.
 *
 * Tres columnas en `xl` y no en `lg`: a 1024px la columna de contenido son unos
 * 700px una vez descontado el raíl de 280px, y tres tarjetas ahí quedan
 * estranguladas.
 *
 * NADA DE ESTA PÁGINA LLEVA overflow-hidden, y conviene que siga así: las marcas
 * de registro de Frame sobresalen 6px de cada esquina y cualquier overflow en un
 * ancestro se las come. Por eso home/Catalog necesita su `-mx-2 px-2` (su
 * carrusel sí recorta) y esta retícula no necesita nada. El hueco mínimo de 22px
 * es la otra mitad de la misma cuenta: menos que eso y las marcas de dos
 * tarjetas vecinas se tocan.
 */
export function CatalogGrid({ items, rotulos, onLimpiar }) {
  if (items.length === 0) {
    return (
      <Frame
        markClass="text-leather"
        className="grid min-h-[280px] place-items-center border-rail/30 bg-transparent px-6"
      >
        <div className="max-w-[400px] text-center">
          <p className="text-[15px] font-semibold text-ink">{catalogCopy.vacioTitulo}</p>
          <p className="mt-[6px] text-[13px] leading-[1.5] text-stone">{catalogCopy.vacioCuerpo}</p>

          <Button variant="quiet" onClick={onLimpiar} className="mt-[18px] px-[22px] py-[10px]">
            {catalogCopy.limpiar}
          </Button>
        </div>
      </Frame>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-[clamp(22px,2.4vw,36px)] sm:grid-cols-2 xl:grid-cols-3">
      {items.map((product) => (
        <CatalogCard
          key={product.id}
          product={product}
          categoria={rotulos.categoria.get(product.categoria) ?? product.categoria}
          genero={product.genero ? rotulos.genero.get(product.genero) : null}
        />
      ))}
    </div>
  )
}
