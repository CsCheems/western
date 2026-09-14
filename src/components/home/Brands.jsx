import { useApiResource } from '../../hooks/useApiResource'
import { getMarcas } from '../../services/marcas'
import { Frame } from '../ui/Frame'

// Columnas por breakpoint, con las clases escritas enteras: Tailwind solo genera
// las que ve en el código, y una armada con `lg:grid-cols-${n}` no la ve. Como
// máximo 2, 3 y 6 —la placa de siempre—; con menos talleres, tantas columnas
// como talleres, para que la placa no deje huecos a la derecha.
const COLUMNAS = {
  base: ['', 'grid-cols-1', 'grid-cols-2'],
  sm: ['', 'sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3'],
  lg: ['', 'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4', 'lg:grid-cols-5', 'lg:grid-cols-6'],
}

const columnas = (n) => ({ base: Math.min(n, 2), sm: Math.min(n, 3), lg: Math.min(n, 6) })

// El divisor izquierdo sólo se dibuja cuando la celda no abre fila, y abrir fila
// es `i % columnas === 0` en cada breakpoint. Se resuelve con utilidades de
// display —que Tailwind ordena de forma predecible— en vez de pelear con la
// cascada de `border-l` / `border-l-0`.
const dividerClass = (i, cols) =>
  [
    i % cols.base !== 0 ? 'block' : 'hidden',
    i % cols.sm !== 0 ? 'sm:block' : 'sm:hidden',
    i % cols.lg !== 0 ? 'lg:block' : 'lg:hidden',
  ].join(' ')

/**
 * Banda de talleres: placa enmarcada de wordmarks en Rye.
 *
 * Los talleres llegan de la base, los mismos que el menú «Marcas» del navbar:
 * solo los que tienen algo publicado. Mientras llegan, la placa guarda su alto
 * sin nombres que después cambien. Si no llegan, o no hay ninguno, la banda no
 * se pinta: un encabezado de talleres sin talleres no dice nada.
 */
export function Brands() {
  const { status, data } = useApiResource(getMarcas)
  const talleres = data?.marcas ?? []

  if (status === 'error' || (status === 'ready' && talleres.length === 0)) return null

  const cols = columnas(talleres.length)

  return (
    <section
      id="marcas"
      className="border-y border-rail bg-panel px-gutter py-[clamp(40px,5vw,66px)]"
    >
      <div className="mx-auto max-w-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="block text-[12px] tracking-kicker text-buck uppercase">
              04 · Las casas
            </span>
            <h2 className="mt-3 font-display text-h3 font-normal text-paper">
              Talleres que trabajamos
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14px] leading-[1.6] text-sand">
            Casas de familia entre Texas, Chihuahua y Zacatecas. Compramos directo del banco de
            trabajo.
          </p>
        </div>

        <Frame
          markClass="text-buck"
          className={`mt-[38px] grid min-h-[104px] border-buck/32 ${COLUMNAS.base[cols.base]} ${COLUMNAS.sm[cols.sm]} ${COLUMNAS.lg[cols.lg]}`}
        >
          {talleres.map((taller, i) => (
            <a
              key={taller.id}
              href="#catalogo"
              className="relative grid h-[104px] place-items-center px-[10px] text-center font-display text-wordmark tracking-[.01em] text-sand transition-colors hover:bg-buck/7 hover:text-gold"
            >
              <span className={`absolute top-0 left-0 h-full w-px bg-buck/22 ${dividerClass(i, cols)}`} />
              {taller.label}
            </a>
          ))}
        </Frame>
      </div>
    </section>
  )
}
