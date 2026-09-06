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
 *
 * `content-start` mantiene la tarjeta a su altura natural, y el defecto que
 * evita costó encontrarlo: si esta retícula acaba siendo ítem de otra que la
 * estire —como lo era antes de que la página envolviera retícula y paginación
 * juntas—, `align-content: normal` se comporta como `stretch` y reparte todo el
 * hueco sobrante entre las filas `auto`. Una página de una sola fila daba
 * tarjetas de 788px en vez de 590, porque la altura de la fila la fijaba el raíl
 * de filtros. Hoy el envoltorio ya la deja en `height: auto`, así que la clase
 * es un seguro, no el arreglo: lo que compra es que el componente no dependa de
 * dónde lo monten.
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
    <div className="grid grid-cols-1 content-start gap-[clamp(22px,2.4vw,36px)] sm:grid-cols-2 xl:grid-cols-3">
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
