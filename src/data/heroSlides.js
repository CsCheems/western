// Los tres slides del hero. `photo` queda en null hasta que lleguen las fotos
// reales (apaisadas, mín. 1920px de ancho); ImageSlot dibuja el placeholder
// mientras tanto.
export const heroSlides = [
  {
    id: 'temporada-de-polvo',
    kicker: '01 · Temporada de polvo',
    title: 'Cuero que aguanta el camino',
    body: 'Botas armadas a mano con suela cosida Goodyear, hormas de horma y piel curtida al vegetal. Se ablandan con el uso, no se rinden.',
    photo: null,
    photoAlt: 'Foto: botas de cuero sobre tablones de madera',
    primary: { label: 'Ver botas', href: '#catalogo' },
    secondary: { label: 'Catálogo completo', href: '#catalogo' },
  },
  {
    id: 'sombrereria',
    kicker: '02 · Sombrerería',
    title: 'Fieltro 6X, moldeado a vapor',
    body: 'Cada copa se plancha, se moja y se forma sobre madera. Toma la forma de tu cabeza en la primera semana y la guarda por años.',
    photo: null,
    photoAlt: 'Foto: sombrero de fieltro sobre fondo oscuro',
    primary: { label: 'Ver sombreros', href: '#catalogo' },
    secondary: { label: 'Guía de tallas', href: '#catalogo' },
  },
  {
    id: 'taller-de-herrajes',
    kicker: '03 · Taller de herrajes',
    title: 'Latón macizo, grabado a mano',
    body: 'Hebillas, conchos y espuelas fundidos en molde de arena y terminados con buril. Piezas numeradas: cada una lleva su folio al reverso.',
    photo: null,
    photoAlt: 'Foto: hebillas y espuelas de latón sobre mesa de trabajo',
    primary: { label: 'Ver herrajes', href: '#catalogo' },
    secondary: { label: 'El taller', href: '#marcas' },
  },
]
