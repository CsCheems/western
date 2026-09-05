import { TriangleAlert } from 'lucide-react'
import { catalogCopy } from '../../data/catalog'
import { Button } from '../ui/Button'
import { Frame } from '../ui/Frame'

/**
 * Los dos estados que no son «hay resultados»: pidiendo y no se pudo.
 *
 * Es el equivalente de tienda de admin/AdminState, escrito aparte porque nada de
 * components/admin cruza a este lado —ni al revés—: allí el marco es AdminCard
 * con su radio y su sombra, y aquí es Frame con sus marcas de registro.
 *
 * SIN RUEDA GIRATORIA mientras carga. El proyecto no tiene ninguna animación de
 * giro y esta no va a ser la primera: la jerarquía se dibuja con reglas.
 *
 * EL VACÍO NO ESTÁ AQUÍ, y no es un olvido. «No encontramos piezas con estos
 * filtros» es consecuencia de lo que hizo quien mira, no un fallo, y pide su
 * propia salida —limpiar los filtros—. Vive en CatalogGrid, junto a lo que
 * cuenta los resultados.
 *
 * El mensaje del error sale tal cual del ApiError: http.js ya lo deja escrito
 * para leerse, así que la red caída y un 500 no necesitan casos distintos.
 */
export function CatalogState({ status, error, onRetry }) {
  if (status === 'loading') {
    return (
      <Frame
        markClass="text-leather"
        className="grid min-h-[280px] place-items-center border-rail/30 bg-transparent"
      >
        <p className="text-[12px] tracking-label text-stone uppercase">{catalogCopy.cargando}</p>
      </Frame>
    )
  }

  return (
    <Frame
      markClass="text-leather"
      className="grid min-h-[280px] place-items-center border-rail/30 bg-transparent px-6"
    >
      <div className="max-w-[380px] text-center">
        {/* Óxido y no granero: sobre papel el granero a este tamaño se apaga. */}
        <TriangleAlert size={18} strokeWidth={1.5} className="mx-auto text-rust" />

        <p className="mt-[14px] text-[15px] font-semibold text-ink">{catalogCopy.errorTitulo}</p>
        <p className="mt-[6px] text-[13px] leading-[1.5] text-stone">{error?.message}</p>

        <Button variant="quiet" onClick={onRetry} className="mt-[18px] px-[22px] py-[10px]">
          {catalogCopy.reintentar}
        </Button>
      </div>
    </Frame>
  )
}
