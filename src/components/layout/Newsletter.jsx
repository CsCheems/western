/** Alta al boletín: UI del diseño, sin envío conectado. */
export function Newsletter() {
  return (
    <>
      <div className="mt-6 flex gap-[10px]">
        <input
          type="email"
          placeholder="tu@correo.com"
          aria-label="Correo electrónico"
          className="h-[42px] min-w-0 flex-1 border border-rail bg-rail/28 px-3 text-[13px] text-paper outline-none placeholder:text-sand"
        />
        <button
          type="button"
          className="h-[42px] shrink-0 cursor-pointer border border-gold bg-gold px-[18px] text-[12px] tracking-[.16em] text-ink uppercase transition-colors hover:border-rust hover:bg-rust hover:text-bone"
        >
          Suscribir
        </button>
      </div>
      <p className="mt-[10px] text-[11px] leading-[1.5] text-sand">
        Una carta al mes: piezas nuevas y notas del taller.
      </p>
    </>
  )
}
