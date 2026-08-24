import { footerColumns } from '../../data/site'
import { FooterLinkColumn } from './FooterLinkColumn'
import { LegalBar } from './LegalBar'
import { Newsletter } from './Newsletter'
import { PromiseRow } from './PromiseRow'

/** Footer de tres filas: promesas, cuerpo principal y barra legal. */
export function Footer() {
  return (
    <footer className="border-t border-rail bg-ink">
      <PromiseRow />

      <div className="mx-auto grid max-w-shell grid-cols-1 gap-[clamp(24px,3vw,52px)] px-gutter py-[clamp(40px,4.6vw,64px)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,.9fr))]">
        <div>
          <span className="block font-display text-[24px] text-gold">Rincón del Oeste</span>
          <span className="mt-[6px] block text-[10px] tracking-[.42em] text-sand uppercase">
            Est. 1892 · Saltillo
          </span>
          <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.65] text-sand">
            Ropa y herrajes de trabajo para quien monta, camina y no le teme al polvo. Tienda en
            Saltillo, envíos a todo el país.
          </p>
          <Newsletter />
        </div>

        {footerColumns.map((column) => (
          <FooterLinkColumn key={column.title} title={column.title} links={column.links} />
        ))}
      </div>

      <LegalBar />
    </footer>
  )
}
