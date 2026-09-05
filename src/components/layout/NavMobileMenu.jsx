import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { catalogCopy, catalogPath } from '../../data/catalog'
import { navLinks } from '../../data/site'

const ENTRADA =
  'flex w-full items-center justify-between border-b border-transparent py-3 text-left transition-colors hover:border-gold hover:text-gold'

const HIJO =
  'block border-b border-transparent py-[10px] pl-3 text-[11px] tracking-wide text-sand uppercase transition-colors hover:border-gold hover:text-gold'

/**
 * El navbar por debajo de `lg`: acordeón dentro del panel de la hamburguesa.
 *
 * NO LLEVA MECÁNICA DE CIERRE PROPIA, y no es un olvido: el panel que lo contiene
 * ya vive dentro de una instancia de useDismissable en Navbar, así que el clic
 * fuera y el Escape ya están puestos. Esto es un desplegable puro — qué sección
 * está abierta y nada más—, con el mismo modismo de clave única que arriba.
 *
 * `closeMenu` cierra el panel entero al navegar: quien pulsa un enlace ya no
 * quiere seguir viendo el menú.
 */
export function NavMobileMenu({ closeMenu }) {
  const [abierto, setAbierto] = useState(null)
  const base = useId()

  return (
    <div className="mx-auto flex max-w-shell flex-col">
      {navLinks.map((item) => {
        if (!item.children) {
          return (
            <Link
              key={item.key}
              to={item.to}
              onClick={closeMenu}
              className={`${ENTRADA} text-paper`}
            >
              {item.label}
            </Link>
          )
        }

        const desplegado = abierto === item.key
        const panelId = `${base}-${item.key}`

        return (
          <div key={item.key}>
            <button
              type="button"
              aria-expanded={desplegado}
              aria-controls={panelId}
              onClick={() => setAbierto((actual) => (actual === item.key ? null : item.key))}
              className={`${ENTRADA} cursor-pointer ${desplegado ? 'text-gold' : 'text-paper'}`}
            >
              {item.label}
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`transition-transform ${desplegado ? 'rotate-180' : ''}`}
              />
            </button>

            <div id={panelId} hidden={!desplegado} className="pb-2">
              {item.params && (
                <Link to={catalogPath(item.params)} onClick={closeMenu} className={HIJO}>
                  {catalogCopy.verTodo(item.label)}
                </Link>
              )}

              {item.children.map((child) => (
                <Link
                  key={child.label}
                  to={catalogPath({ ...item.params, ...child.params })}
                  onClick={closeMenu}
                  className={HIJO}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
