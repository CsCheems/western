const TONES = {
  // Controles sobre fondo oscuro (navbar, flechas del hero).
  dark: 'border-rail text-paper hover:border-buck hover:bg-buck/12',
  // Flechas del hero: se llenan de oro.
  gold: 'border-buck/55 bg-ink/55 text-paper hover:border-gold hover:bg-gold hover:text-ink',
  // Flechas del catálogo, sobre papel: se llenan de rojo granero.
  paper: 'border-leather text-rail hover:border-barn hover:bg-barn hover:text-bone',
}

const SIZES = {
  sm: 'h-[38px] w-[38px]',
  md: 'h-[42px] w-[42px]',
  lg: 'h-[46px] w-[46px]',
}

/** Control cuadrado con un icono centrado. Radio 0, borde de 1px. */
export function IconButton({
  tone = 'dark',
  size = 'sm',
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      className={`grid shrink-0 cursor-pointer place-items-center border transition-colors ${TONES[tone]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
