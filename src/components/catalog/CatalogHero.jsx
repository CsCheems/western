import { catalogCopy } from '../../data/catalog'

/**
 * La banda de título, sobre oscuro. Deja claro de entrada que sigues en la
 * tienda antes de que empiece la hoja de papel con la mercancía.
 *
 * El h1 es de la página y no de la sección: /catalogo tiene un solo título, y es
 * este.
 */
export function CatalogHero() {
  return (
    <section className="border-b border-rail bg-ink px-gutter pt-[clamp(38px,5vw,64px)] pb-[clamp(30px,4vw,52px)]">
      <div className="mx-auto max-w-shell">
        <span className="block text-[12px] tracking-kicker text-barn uppercase">
          {catalogCopy.kicker}
        </span>

        <h1 className="mt-3 font-display text-h2 font-normal text-paper">{catalogCopy.title}</h1>

        <p className="mt-[14px] max-w-[52ch] text-[14px] leading-[1.6] text-sand">
          {catalogCopy.intro}
        </p>
      </div>
    </section>
  )
}
