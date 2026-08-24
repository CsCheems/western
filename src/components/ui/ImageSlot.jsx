/**
 * Hueco de fotografía. Las fotos reales están pendientes: mientras `src` sea
 * null dibuja la caja con su descripción, y en cuanto llegue renderiza el
 * <img> con el mismo encuadre.
 *
 * Hero: apaisado, mín. 1920px de ancho. Producto: vertical 4:5, mín. 1000×1250.
 */
export function ImageSlot({ src, alt, className = '', labelClass = 'text-stone' }) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex h-full w-full items-center justify-center p-6 ${className}`}
    >
      <span className={`text-center text-[11px] tracking-label uppercase ${labelClass}`}>
        {alt}
      </span>
    </div>
  )
}
