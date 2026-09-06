import { ChevronLeft, ChevronRight } from 'lucide-react'
import { catalogCopy } from '../../data/catalog'
import { formatInteger } from '../../utils/format'
import { ventanaPaginas } from '../../utils/catalog'

// El mismo modismo que FICHA en CatalogToolbar: la receta en un const de módulo
// y el className solo para el hueco. Cuadrado, hairline y sin relleno, como todo
// lo de la tienda.
const BOTON =
  'inline-flex h-[34px] min-w-[34px] cursor-pointer items-center justify-center gap-[6px] border px-[10px] text-[11px] tracking-label uppercase transition-colors'

const TONOS = {
  // Reposo: el mismo borde apagado de las fichas de filtro activo.
  idle: 'border-rail/40 text-ink hover:border-barn hover:text-barn',
  // La página en la que estás. Macizo y no solo con el borde marcado: en una
  // fila de siete números iguales, un borde de 1px no basta para encontrarte.
  actual: 'cursor-default border-barn bg-barn text-paper',
  // Extremo alcanzado. No se esconde el botón —la fila cambiaría de ancho al
  // pasar de página y los números bailarían bajo el dedo—, se apaga.
  off: 'cursor-not-allowed border-rail/20 text-stone/45',
}

/**
 * Los números de página, bajo la retícula.
 *
 * SIN `Frame`, y es deliberado: sus marcas de registro sobresalen 6px de cada
 * esquina, así que una fila de botones contiguos necesitaría 22px de hueco entre
 * cada dos —la misma cuenta que gobierna la retícula— y esto dejaría de leerse
 * como un control para leerse como siete objetos sueltos.
 *
 * La ventana con elipsis vive en utils/catalog.js: qué números se pintan es
 * aritmética, no dibujo, y allí se puede leer sin React de por medio.
 *
 * Con una sola página no se pinta nada. Un «1 de 1» solitario no informa de
 * nada y ocupa el sitio de la respuesta.
 */
export function CatalogPagination({ pagina, total, onIr }) {
  if (total <= 1) return null

  const anterior = pagina - 1
  const siguiente = pagina + 1

  return (
    <nav
      aria-label={catalogCopy.paginacion}
      className="mt-[clamp(28px,3vw,44px)] flex flex-wrap items-center justify-center gap-[8px]"
    >
      <button
        type="button"
        disabled={pagina === 1}
        aria-label={catalogCopy.paginaAnterior}
        onClick={() => onIr(anterior)}
        className={`${BOTON} ${pagina === 1 ? TONOS.off : TONOS.idle}`}
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
        <span className="hidden sm:inline">{catalogCopy.paginaAnterior}</span>
      </button>

      {ventanaPaginas(pagina, total).map((entrada, i) =>
        typeof entrada === 'number' ? (
          <button
            key={entrada}
            type="button"
            // `aria-current` y no un aria-label distinto: quien navega por voz
            // pide «página 4», y esto dice cuál es sin renombrarlas todas.
            aria-current={entrada === pagina ? 'page' : undefined}
            aria-label={catalogCopy.irAPagina(entrada)}
            onClick={() => entrada !== pagina && onIr(entrada)}
            className={`${BOTON} tabular-nums ${entrada === pagina ? TONOS.actual : TONOS.idle}`}
          >
            {formatInteger(entrada)}
          </button>
        ) : (
          // El hueco no es un botón ni se anuncia: el lector de pantalla ya sabe
          // dónde está por el aria-current, y unos puntos leídos en voz alta
          // entre dos números solo estorban.
          <span
            key={`hueco-${i}`}
            aria-hidden="true"
            className="px-[2px] text-[11px] tracking-label text-stone"
          >
            {'…'}
          </span>
        ),
      )}

      <button
        type="button"
        disabled={pagina === total}
        aria-label={catalogCopy.paginaSiguiente}
        onClick={() => onIr(siguiente)}
        className={`${BOTON} ${pagina === total ? TONOS.off : TONOS.idle}`}
      >
        <span className="hidden sm:inline">{catalogCopy.paginaSiguiente}</span>
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>

      {/* Los números dicen dónde estás mirándolos; esto lo dice en palabras, que
          es lo que necesita quien no los ve. `aria-live` no hace falta: al pulsar
          se mueve el foco y la retícula entera cambia. */}
      <p className="mt-[10px] w-full text-center text-[11px] tracking-label text-stone tabular-nums">
        {catalogCopy.paginaActual(pagina, total)}
      </p>
    </nav>
  )
}
