import { workshops } from '../../data/site'
import { Frame } from '../ui/Frame'

// La placa pasa de 6 columnas a 3 y a 2. El divisor izquierdo sólo se dibuja
// cuando la celda no abre fila, así que se resuelve por breakpoint con
// utilidades de display —que Tailwind ordena de forma predecible— en vez de
// pelear con la cascada de `border-l` / `border-l-0`.
const dividerClass = (i) =>
  [
    i % 2 !== 0 ? 'block' : 'hidden',
    i % 3 !== 0 ? 'sm:block' : 'sm:hidden',
    i !== 0 ? 'lg:block' : 'lg:hidden',
  ].join(' ')

/** Banda de talleres: placa enmarcada de seis wordmarks en Rye. */
export function Brands() {
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
            Seis casas de familia entre Texas, Chihuahua y Zacatecas. Compramos directo del banco
            de trabajo.
          </p>
        </div>

        <Frame
          markClass="text-buck"
          className="mt-[38px] grid grid-cols-2 border-buck/32 sm:grid-cols-3 lg:grid-cols-6"
        >
          {workshops.map((name, i) => (
            <a
              key={name}
              href="#catalogo"
              className="relative grid h-[104px] place-items-center px-[10px] text-center font-display text-wordmark tracking-[.01em] text-sand transition-colors hover:bg-buck/7 hover:text-gold"
            >
              <span className={`absolute top-0 left-0 h-full w-px bg-buck/22 ${dividerClass(i)}`} />
              {name}
            </a>
          ))}
        </Frame>
      </div>
    </section>
  )
}
