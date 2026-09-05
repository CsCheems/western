import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import { Link } from 'react-router-dom'
import { catalogCopy, catalogPath } from '../../data/catalog'
import { useDismissable } from '../../hooks/useDismissable'
import { Frame } from '../ui/Frame'

const TRIGGER =
  'flex cursor-pointer items-center gap-[5px] border-b py-[6px] transition-colors hover:border-gold hover:text-gold'

const ITEM =
  'block px-[14px] py-[10px] text-[12px] tracking-wide uppercase transition-colors hover:bg-buck/10 hover:text-gold'

/**
 * Un menú del navbar con su desplegable.
 *
 * SE ABRE CON CLIC Y NO CON HOVER, igual que el menú de cuenta. Un menú de hover
 * necesita temporizadores de apertura y cierre y un triángulo de seguridad para
 * el recorrido en diagonal —y clic de todas formas, porque en táctil no hay
 * hover—: es una segunda mecánica de cierre viviendo al lado de la que ya
 * tenemos, que es como dos desplegables del mismo sitio acaban comportándose
 * distinto. A cambio, `aria-expanded` + Escape + devolución del foco es un
 * contrato completo. El coste es un clic.
 *
 * Quién está abierto lo decide el navbar con UNA clave, no con cinco booleanos.
 * Cada instancia llama a useDismissable por su cuenta, pero la primera línea de
 * ese hook es `if (!open) return`, así que como mucho una tiene escuchas puestas.
 * Y como el menú de cuenta y la hamburguesa usan el mismo hook, abrir cualquiera
 * cierra a los demás sin una sola línea de coordinación.
 *
 * El envoltorio es `relative` y de alto completo por tres razones a la vez:
 * Frame lleva `relative` fijo en su className y gana la cascada, así que no se le
 * puede pasar `absolute`; el panel se alinea a SU disparador y no al borde de la
 * fila; y `h-full` es lo que hace que `top-full` caiga al fondo de la fila de
 * 78px en vez de a 25px bajo el texto.
 */
export function NavMenu({ item, open, onToggle, onClose }) {
  const panelId = useId()
  const { triggerRef, panelRef } = useDismissable({ open, onClose })

  return (
    <div className="relative flex h-full items-center">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={onToggle}
        className={`${TRIGGER} ${open ? 'border-gold text-gold' : 'border-transparent text-paper'}`}
      >
        {item.label}
        <ChevronDown
          size={13}
          strokeWidth={1.5}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        // El +10px no es holgura decorativa: las marcas de registro sobresalen
        // 6px hacia arriba y chocarían con el borde inferior del header. El
        // número es el mismo que usa AccountMenu, para que los dos desplegables
        // del navbar cuelguen a la misma profundidad.
        <div className="absolute top-[calc(100%+10px)] left-0 w-[220px]">
          <Frame
            ref={panelRef}
            id={panelId}
            markClass="text-gold"
            className="animate-panel-in border-buck/45 bg-panel py-[5px]"
          >
            {item.params && (
              <Link
                to={catalogPath(item.params)}
                onClick={onClose}
                className={`${ITEM} text-sand`}
              >
                {catalogCopy.verTodo(item.label)}
              </Link>
            )}

            {item.children.map((child) => (
              <Link
                key={child.label}
                // Los hijos llevan solo el delta y aquí se fusiona con lo del
                // padre: «Botas ▸ Damas» es la categoría de arriba más el género
                // de abajo.
                to={catalogPath({ ...item.params, ...child.params })}
                // Se cierra sin devolver el foco, al revés que AccountMenu: allí
                // las acciones te dejan en la página, y aquí estás navegando —
                // arrancar el foco de vuelta a un menú tras llegar a otro sitio
                // es justo lo contrario de lo que quiere quien acaba de pulsar.
                onClick={onClose}
                className={`${ITEM} text-paper`}
              >
                {child.label}
              </Link>
            ))}
          </Frame>
        </div>
      )}
    </div>
  )
}
