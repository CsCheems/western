// Las utilidades `disabled:` ganan por especificidad a las planas de cada
// variante, así que el estado deshabilitado se define una sola vez aquí.
const BASE =
  'inline-flex items-center justify-center gap-[10px] border text-[13px] tracking-[.16em] uppercase transition-colors cursor-pointer disabled:cursor-not-allowed disabled:border-rail disabled:bg-rail/40 disabled:text-sand'

const VARIANTS = {
  // CTA de acento: oro que vira a óxido en hover.
  solid: 'border-gold bg-gold text-ink hover:border-rust hover:bg-rust hover:text-bone',
  // Secundario sobre oscuro: transparente con borde ante.
  outline: 'border-buck text-paper hover:border-gold hover:bg-buck/14',
  // Botón de tarjeta sobre papel: hairline oscuro que se llena de oro.
  quiet:
    'border-rail text-ink text-[12px] tracking-wide hover:border-gold hover:bg-gold',
}

/**
 * Botón del design system: radio 0, borde de 1px, mayúsculas con tracking
 * amplio. Renderiza <a> cuando recibe `href`.
 */
export function Button({
  as,
  variant = 'solid',
  className = '',
  children,
  ...rest
}) {
  const Tag = as ?? (rest.href ? 'a' : 'button')
  const type = Tag === 'button' ? { type: 'button' } : {}

  return (
    <Tag className={`${BASE} ${VARIANTS[variant]} ${className}`} {...type} {...rest}>
      {children}
    </Tag>
  )
}
