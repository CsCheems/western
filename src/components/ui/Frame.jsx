const CORNERS = {
  tl: '-top-1.5 -left-1.5',
  tr: '-top-1.5 -right-1.5',
  bl: '-bottom-1.5 -left-1.5',
  br: '-bottom-1.5 -right-1.5',
}

function Mark({ at, className }) {
  return (
    <span
      className={`pointer-events-none absolute h-[11px] w-[11px] ${CORNERS[at]} ${className}`}
    >
      <span className="absolute top-0 left-[5px] h-full w-px bg-current" />
      <span className="absolute top-[5px] left-0 h-px w-full bg-current" />
    </span>
  )
}

/**
 * Marco blueprint: el patrón transversal del design system. Todo marco es un
 * objeto de dibujo técnico — esquinas cuadradas, borde de 1px, sin relleno y
 * cuatro marcas de registro «+» que sobresalen 6px de las esquinas.
 *
 * Nunca redondear ni omitir las marcas. Como sobresalen, el contenedor de un
 * marco necesita ese aire (de ahí el `-mx-2 px-2` del track del catálogo y los
 * gaps ≥ 22px de la grilla).
 *
 * Las marcas van sueltas, sin envoltorio: un wrapper se convertiría en celda
 * fantasma cuando el propio marco es una grilla (la placa de talleres) o un
 * flex (la tarjeta de producto).
 *
 * `markClass` da el color de las marcas; `className` el del borde y el resto
 * del layout.
 */
export function Frame({
  as: Tag = 'div',
  markClass = 'text-buck',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag className={`relative border ${className}`} {...rest}>
      {children}
      <Mark at="tl" className={markClass} />
      <Mark at="tr" className={markClass} />
      <Mark at="bl" className={markClass} />
      <Mark at="br" className={markClass} />
    </Tag>
  )
}
