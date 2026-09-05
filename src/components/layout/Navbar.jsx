import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { navLinks } from '../../data/site'
import { useDismissable } from '../../hooks/useDismissable'
import { IconButton } from '../ui/IconButton'
import { AccountMenu } from './AccountMenu'
import { NavMenu } from './NavMenu'
import { NavMobileMenu } from './NavMobileMenu'

const LINK =
  'border-b border-transparent py-[6px] transition-colors hover:border-gold hover:text-gold'

// El contador es parte del diseño, no del estado de un carrito: el handoff
// deja la bolsa como UI. Cuando exista carrito, viene de ahí.
const BAG_COUNT = 3

// El lockup ya trae emblema y nombre, así que la marca es solo la imagen. El
// alt sustituye al texto que estaba aquí antes.
//
// `Link` y no un ancla: desde que existe /perfil, el logo es la forma de volver
// a la portada, y con un `href` se recargaría el sitio entero para nada.
function BrandMark() {
  return (
    <Link to="/" className="mr-auto flex shrink-0 items-center">
      <img
        src={logo}
        alt="Rincón del Oeste"
        width={1983}
        height={793}
        className="h-[40px] w-auto sm:h-[48px]"
      />
    </Link>
  )
}

/**
 * Navbar sticky de 78px. Por debajo de `lg` el buscador colapsa a botón-icono y
 * las categorías pasan al acordeón de la hamburguesa.
 *
 * QUIÉN ESTÁ ABIERTO ES UNA CLAVE, NO CINCO BOOLEANOS. Con un booleano por menú
 * habría que acordarse de apagar los otros cuatro en cada apertura, y el primer
 * olvido deja dos paneles encima. Con una clave, abrir es escribir un nombre.
 *
 * La forma de actualizador en `setOpenMenu` tampoco es opcional: al pulsar el
 * disparador B con A abierto, el `pointerdown` de useDismissable cierra A y el
 * `click` abre B en el mismo tick. Con un valor plano las dos actualizaciones se
 * pisan; con el actualizador, la segunda ve lo que dejó la primera.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const closeMenus = useCallback(() => setOpenMenu(null), [])

  // El disparador y el panel no comparten padre —el botón vive en el grupo de
  // controles y el panel cuelga del header—, de ahí las dos refs.
  const { triggerRef, panelRef } = useDismissable({ open: menuOpen, onClose: closeMenu })

  return (
    <header className="sticky top-0 z-30 border-b border-rail bg-ink/97 backdrop-blur-[6px]">
      {/* `relative` para que el panel del menú de cuenta cuelgue de esta fila y
          no del header: la fila es la que va centrada con `max-w-shell`, así que
          es la única referencia que alinea el panel con el borde derecho del
          contenido también por encima de 1360px. */}
      <div className="relative mx-auto flex h-[78px] max-w-shell items-center gap-[clamp(14px,2.2vw,40px)] px-gutter">
        <BrandMark />

        {/* `h-full`: es contra este alto contra el que resuelve el `h-full` de
            cada NavMenu, y de ahí que sus paneles caigan al fondo de la fila. */}
        <nav className="hidden h-full shrink-0 items-center gap-[clamp(9px,1.2vw,24px)] text-[12px] tracking-[.1em] whitespace-nowrap uppercase lg:flex">
          {navLinks.map((item) =>
            item.children ? (
              <NavMenu
                key={item.key}
                item={item}
                open={openMenu === item.key}
                onToggle={() => setOpenMenu((actual) => (actual === item.key ? null : item.key))}
                onClose={closeMenus}
              />
            ) : (
              <Link key={item.key} to={item.to} className={`${LINK} text-paper`}>
                {item.label}
              </Link>
            ),
          )}
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

          <AccountMenu />

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
            ref={triggerRef}
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
        // Con cinco menús desplegados el panel pasa de largo del alto de un
        // teléfono, así que scrollea por dentro. ESE overflow es la razón de que
        // aquí no entre ningún Frame: recortaría sus marcas de registro.
        <nav
          ref={panelRef}
          className="max-h-[calc(100dvh-113px)] overflow-y-auto border-t border-rail px-gutter py-4 text-[12px] tracking-[.1em] uppercase lg:hidden"
        >
          <NavMobileMenu closeMenu={closeMenu} />
        </nav>
      )}
    </header>
  )
}
