const TONES = {
  dark: { on: 'bg-gold', off: 'bg-paper/35' },
  paper: { on: 'bg-barn', off: 'bg-rail/28' },
}

/**
 * Puntos de página: barras de 44×4px que crecen a 5px cuando están activas.
 * El salto lo resuelve `goTo` del carrusel, que encadena pasos hacia adelante
 * para no rebobinar.
 */
export function CarouselDots({ count, index, onSelect, tone = 'dark', label, className = '' }) {
  const { on, off } = TONES[tone]

  return (
    <div className={`flex items-center justify-center gap-[14px] ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${label} ${i + 1}`}
          aria-current={i === index}
          onClick={() => onSelect(i)}
          className={`w-[44px] cursor-pointer border-0 p-0 transition-all ${
            i === index ? `h-[5px] ${on}` : `h-[4px] ${off}`
          }`}
        />
      ))}
    </div>
  )
}
