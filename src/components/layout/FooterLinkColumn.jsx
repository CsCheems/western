/** Columna de enlaces del footer (Tienda, Ayuda, La casa). */
export function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-[18px] text-[12px] font-semibold tracking-[.22em] text-buck uppercase">
        {title}
      </h4>
      <div className="flex flex-col gap-[11px] text-[14px]">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`transition-colors hover:text-gold ${
              link.highlight ? 'text-rust' : 'text-paper'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
