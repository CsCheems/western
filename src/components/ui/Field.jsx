import { AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { useId, useState } from 'react'

// La receta de input sobre oscuro del buscador del navbar y del boletín, ya en
// su tercera copia: toca extraerla. A diferencia de aquellas no lleva
// `outline-none`, para recuperar el anillo dorado que `:focus-visible` da a
// todo el sitio desde index.css.
//
// El fondo no está aquí sino en el mapa de tonos: cambia con el estado.
const INPUT =
  'h-[42px] w-full min-w-0 border px-3 text-[13px] text-paper transition-colors placeholder:text-sand disabled:cursor-not-allowed disabled:text-sand'

const TONES = {
  // Reposo: hairline de riel que se aclara al pasar por encima.
  idle: 'border-rail bg-rail/28 hover:border-buck',
  // Error: óxido, no granero. Granero sobre el panel da 1.75:1 y desaparece.
  error: 'border-rust bg-rail/28',
  // Solo lectura: sin hover —un campo que no se puede escribir no debe
  // iluminarse al pasar el ratón, porque eso es una promesa— y el fondo más
  // plano, para que se lea como dato y no como control esperando escritura. El
  // texto sí se queda en `paper`: es información real, no algo apagado.
  readonly: 'border-rail/55 bg-rail/12',
}

/**
 * Campo del formulario: etiqueta visible, input y mensaje de error.
 *
 * El sitio etiqueta sus controles con `aria-label`, que basta para un icono
 * suelto pero no para un alta de once campos —ahí la etiqueta tiene que verse—.
 *
 * El mensaje de error va en `notice` con el icono en `rust`: óxido sobre panel
 * son 3.6:1, suficiente para un icono (AA no textual pide 3:1) pero corto para
 * texto de 11px.
 *
 * `readOnly` y `disabled` NO son lo mismo y la diferencia importa: un campo
 * deshabilitado se apaga, sale del orden de tabulación y no deja seleccionar su
 * contenido —es para un formulario que ahora mismo no se puede usar, como
 * mientras se envía—; uno de solo lectura se enfoca, se lee y se copia, que es
 * lo que se quiere de unos datos que se están consultando. De ahí que el perfil
 * use el segundo.
 */
export function Field({ field, value, error, disabled = false, readOnly = false, onChange }) {
  const id = useId()
  const errorId = `${id}-error`

  const [revealed, setRevealed] = useState(false)
  const isPassword = field.type === 'password'

  // El ojo no se pinta en lectura: no hay nada que revelar que no se pueda ver.
  const canReveal = isPassword && !readOnly

  const tone = readOnly ? TONES.readonly : error ? TONES.error : TONES.idle

  return (
    <div className={field.half ? '' : 'sm:col-span-2'}>
      <label htmlFor={id} className="block text-[11px] tracking-label text-sand uppercase">
        {field.label}
      </label>

      <div className="relative mt-[7px]">
        <input
          id={id}
          name={field.name}
          type={isPassword && revealed ? 'text' : field.type}
          value={value}
          // Sin placeholder en lectura: un «Mínimo 8 caracteres» bajo un campo
          // que no se puede escribir invita a algo imposible.
          placeholder={readOnly ? undefined : field.placeholder}
          autoComplete={field.autoComplete}
          inputMode={field.inputMode}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange?.(field.name, event.target.value)}
          className={`${INPUT} ${tone} ${canReveal ? 'pr-[40px]' : ''}`}
        />

        {canReveal && (
          <button
            type="button"
            disabled={disabled}
            aria-label={revealed ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setRevealed((shown) => !shown)}
            className="absolute inset-y-0 right-0 grid w-[40px] cursor-pointer place-items-center text-sand transition-colors hover:text-gold disabled:cursor-not-allowed"
          >
            {revealed ? (
              <EyeOff size={15} strokeWidth={1.5} />
            ) : (
              <Eye size={15} strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-[6px] flex items-start gap-[6px] text-[11px] leading-[1.45] text-notice"
        >
          <AlertTriangle size={12} strokeWidth={1.5} className="mt-[3px] shrink-0 text-rust" />
          {error}
        </p>
      )}
    </div>
  )
}
