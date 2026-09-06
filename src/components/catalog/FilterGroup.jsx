import { formatInteger } from '../../utils/format'

// El reseteo de la capa base ya deja los input en radio 0, así que la casilla
// solo tiene que apagar el dibujo del sistema. Marcada es un cuadro de oro
// macizo, sin palomita: la jerarquía de la casa se dibuja con reglas y rellenos,
// nunca con adornos dentro de la caja.
const CASILLA =
  'h-[15px] w-[15px] shrink-0 cursor-pointer appearance-none border border-buck/55 bg-transparent transition-colors checked:border-gold checked:bg-gold disabled:cursor-not-allowed disabled:border-rail/60'

const FILA =
  'flex cursor-pointer items-center gap-[10px] py-[6px] text-[12px] tracking-wide uppercase transition-colors hover:text-gold'

/**
 * Un grupo de casillas del panel lateral, con su cuenta a la derecha.
 *
 * Una opción con cero se deshabilita en vez de esconderse: las cuentas salen del
 * catálogo entero y no de lo ya filtrado, así que un cero significa «esto no se
 * vende aquí hoy» y no «lo has escondido tú». Quitarla de la lista haría que el
 * grupo cambiara de tamaño al filtrar, que es justo lo que no queremos.
 */
export function FilterGroup({ title, options, selected, onToggle }) {
  return (
    // `min-w-0` NO es de adorno y quitarlo rompe dos cosas a la vez. El navegador
    // le impone a todo <fieldset> un `min-inline-size: min-content` desde su hoja
    // de usuario, así que el grupo no puede encoger por debajo de su etiqueta más
    // larga: con «Monturas y talabartería» dentro, este fieldset medía 250px en un
    // raíl de 242 mientras los otros tres medían 242. De ahí salían los dos
    // defectos que se veían —sus cuentas quedaban 8px a la derecha de las demás, y
    // el scroller desbordaba esos mismos 8px, que con `overflow-y: auto` el
    // navegador convierte en `overflow-x: auto` y pinta una barra horizontal—.
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-[6px] text-[11px] tracking-label text-buck uppercase">{title}</legend>

      {options.map((opcion) => {
        const marcado = selected.has(opcion.id)
        const vacio = opcion.count === 0

        return (
          <label
            key={opcion.id}
            className={`${FILA} ${vacio ? 'cursor-not-allowed text-sand/45 hover:text-sand/45' : marcado ? 'text-paper' : 'text-sand'}`}
          >
            <input
              type="checkbox"
              checked={marcado}
              disabled={vacio}
              onChange={() => onToggle(opcion.id)}
              className={CASILLA}
            />
            <span className="flex-1 truncate">{opcion.label}</span>
            <span className="text-[11px] tabular-nums text-sand/70">
              {formatInteger(opcion.count)}
            </span>
          </label>
        )
      })}
    </fieldset>
  )
}

/**
 * Una casilla suelta —«solo disponibles»— que no pertenece a ningún grupo.
 *
 * Vive en este archivo y no en el suyo porque comparte la receta de la casilla
 * con el grupo de arriba, y esa receta en dos archivos es como acaban con dos
 * bordes distintos.
 */
export function FilterToggle({ label, count, checked, onChange }) {
  return (
    <label className={`${FILA} ${checked ? 'text-paper' : 'text-sand'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={CASILLA}
      />
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && (
        <span className="text-[11px] tabular-nums text-sand/70">{formatInteger(count)}</span>
      )}
    </label>
  )
}
