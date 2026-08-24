import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { navLinks } from '../../data/site'
import { IconButton } from '../ui/IconButton'

const LINK =
  'border-b border-transparent py-[6px] transition-colors hover:border-gold hover:text-gold'

// El contador es parte del diseño, no del estado de un carrito: el handoff
// deja la bolsa como UI. Cuando exista carrito, viene de ahí.
const BAG_COUNT = 3

function BrandMark() {
  return (
    <a href="#" className="mr-auto flex shrink-0 flex-col leading-none whitespace-nowrap">
      <span className="font-display text-[21px] leading-[1.08] tracking-[.01em] text-gold">
        Rincón
        <br />
        del Oeste
      </span>
      <span className="mt-[6px] text-[10px] tracking-[.36em] text-sand uppercase">
        Est. 1892
      </span>
    </a>
  )
}

/**
 * Navbar sticky de 78px. La fila suma ~870px de contenido, así que cabe entera
 * desde ~900px de viewport; por debajo el buscador colapsa a botón-icono y las
 * categorías pasan a un menú desplegable.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-rail bg-ink/97 backdrop-blur-[6px]">
      <div className="mx-auto flex h-[78px] max-w-shell items-center gap-[clamp(14px,2.2vw,40px)] px-gutter">
        <BrandMark />

        <nav className="hidden shrink-0 items-center gap-[clamp(10px,1.4vw,26px)] text-[12px] tracking-[.1em] whitespace-nowrap uppercase lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${LINK} ${link.highlight ? 'text-rust' : 'text-paper'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden h-[38px] w-[clamp(92px,11vw,200px)] shrink-0 items-center gap-2 border border-rail bg-rail/28 px-[10px] md:flex">
            <Search size={15} strokeWidth={1.5} className="shrink-0 text-sand" />
            <input
              type="text"
              placeholder="Buscar"
              aria-label="Buscar"
              className="w-full min-w-0 border-0 bg-transparent text-[13px] text-paper outline-none placeholder:text-sand"
            />
          </div>
          <IconButton aria-label="Buscar" className="md:hidden">
            <Search size={17} strokeWidth={1.5} />
          </IconButton>

          <IconButton aria-label="Mi cuenta">
            <User size={17} strokeWidth={1.5} />
          </IconButton>

          <button
            type="button"
            aria-label="Bolsa de compra"
            className="flex h-[38px] shrink-0 cursor-pointer items-center gap-[9px] border border-gold bg-gold px-[14px] text-[13px] tracking-[.12em] whitespace-nowrap text-ink uppercase transition-colors hover:border-rust hover:bg-rust hover:text-bone"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            <span className="max-sm:hidden">Bolsa</span>
            <span className="grid h-[18px] min-w-[18px] place-items-center bg-barn text-[11px] tracking-normal text-bone">
              {BAG_COUNT}
            </span>
          </button>

          <IconButton
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden"
          >
            {menuOpen ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
          </IconButton>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-rail px-gutter py-4 text-[12px] tracking-[.1em] uppercase lg:hidden">
          <div className="mx-auto flex max-w-shell flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${LINK} py-3 ${link.highlight ? 'text-rust' : 'text-paper'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
