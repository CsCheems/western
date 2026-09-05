import { SlidersHorizontal, X } from 'lucide-react'
import { catalogCopy } from '../../data/catalog'
import { formatMoney } from '../../utils/format'

const FICHA =
  'inline-flex cursor-pointer items-center gap-[7px] border border-rail/40 px-[10px] py-[5px] text-[11px] tracking-label text-ink uppercase transition-colors hover:border-barn hover:text-barn'

/**
 * La barra sobre la retícula: cuántas piezas quedan, qué filtros están puestos y
 * cómo quitarlos.
 *
 * Los rótulos de las fichas se resuelven aquí y no en el hook: los mapas vienen
 * de las facetas que trajo el servidor, y useCatalogFilters no sabe de
 * peticiones. La URL dice «botas» y la ficha tiene que decir «Botas».
 *
 * La cuenta lleva aria-live: al filtrar no se mueve el foco ni cambia la ruta, y
 * sin anunciarla la página cambiaría entera en silencio.
 */
export function CatalogToolbar({
  count,
  total,
  activos,
  rotulos,
  precio,
  filtros,
  acciones,
  filtrosAbiertos,
  onToggleFiltros,
}) {
  const rotulo = (ficha) => {
    if (ficha.tipo === 'lista') return rotulos[ficha.param].get(ficha.valor) ?? ficha.valor
    if (ficha.tipo === 'texto') return `«${ficha.valor}»`
    if (ficha.tipo === 'bool') return catalogCopy.disponibles

    return `${formatMoney(filtros.min ?? precio.min)} — ${formatMoney(filtros.max ?? precio.max)}`
  }

  const quitar = (ficha) => {
    if (ficha.tipo === 'lista') return acciones.quitar(ficha.param, ficha.valor)
    if (ficha.tipo === 'texto') return acciones.buscar('')
    if (ficha.tipo === 'bool') return acciones.disponibilidad(false)

    return acciones.precio(null, null)
  }

  return (
    <div className="mb-[26px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-[13px] tracking-label text-stone">
          {activos.length > 0 ? catalogCopy.deTotal(count, total) : catalogCopy.cuenta(count)}
        </p>

        {/* El raíl se despliega en flujo y no en un cajón: un cajón necesitaría
            portal, trampa de foco, bloqueo de scroll y Escape —toda la maquinaria
            del modal— para no ganar nada aquí. */}
        <button
          type="button"
          aria-expanded={filtrosAbiertos}
          onClick={onToggleFiltros}
          className="inline-flex cursor-pointer items-center gap-[8px] border border-rail px-[14px] py-[9px] text-[12px] tracking-wide text-ink uppercase transition-colors hover:border-gold hover:bg-gold lg:hidden"
        >
          <SlidersHorizontal size={14} strokeWidth={1.5} />
          {filtrosAbiertos
            ? catalogCopy.cerrarFiltros
            : activos.length > 0
              ? catalogCopy.filtrosCon(activos.length)
              : catalogCopy.filtros}
        </button>
      </div>

      {activos.length > 0 && (
        <div className="mt-[14px] flex flex-wrap items-center gap-[8px]">
          {activos.map((ficha) => {
            const etiqueta = rotulo(ficha)

            return (
              <button
                key={`${ficha.param}-${ficha.valor ?? ficha.tipo}`}
                type="button"
                aria-label={catalogCopy.quitar(etiqueta)}
                onClick={() => quitar(ficha)}
                className={FICHA}
              >
                {etiqueta}
                <X size={12} strokeWidth={1.5} />
              </button>
            )
          })}

          <button
            type="button"
            onClick={acciones.limpiar}
            className="ml-[4px] cursor-pointer border-b border-transparent text-[11px] tracking-label text-stone uppercase transition-colors hover:border-barn hover:text-barn"
          >
            {catalogCopy.limpiar}
          </button>
        </div>
      )}
    </div>
  )
}
