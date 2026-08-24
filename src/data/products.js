// Doce piezas de temporada. Contenido de muestra: marcas, precios y nombres son
// ficticios. `photo` queda en null hasta que lleguen las fotos reales
// (verticales 4:5, mín. 1000×1250).
//
// El catálogo se pagina de 6 en 6 — mantener ese múltiplo si crece, para no
// dejar páginas incompletas.
export const PRODUCTS_PER_PAGE = 6

export const products = [
  {
    id: 'botas-laredo',
    category: 'Calzado',
    title: 'Botas camperas «Laredo»',
    description: 'Punta cuadrada, cuero graso, suela cosida.',
    price: '$4,290',
    was: null,
    badge: { label: 'Nuevo', tone: 'new' },
    photo: null,
    photoAlt: 'Botas Laredo',
  },
  {
    id: 'fieltro-durango',
    category: 'Sombrerería',
    title: 'Fieltro 6X «Durango»',
    description: 'Copa cattleman, falda de 4", cinta de crin.',
    price: '$3,150',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Sombrero Durango',
  },
  {
    id: 'cinturon-sierra-alta',
    category: 'Cintos',
    title: 'Cinturón labrado «Sierra Alta»',
    description: 'Vaqueta labrada a mano, 38 mm, hebilla intercambiable.',
    price: '$1,180',
    was: '$1,480',
    badge: { label: '−20%', tone: 'sale' },
    photo: null,
    photoAlt: 'Cinturón Sierra Alta',
  },
  {
    id: 'camisa-mezquite',
    category: 'Camisas',
    title: 'Camisa vaquera «Mezquite»',
    description: 'Broche de presión, canesú en punta, sarga lavada.',
    price: '$980',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Camisa Mezquite',
  },
  {
    id: 'chaqueta-bisonte',
    category: 'Abrigos',
    title: 'Chaqueta de gamuza «Bisonte»',
    description: 'Flecos en la espalda, forro de manta, ante ámbar.',
    price: '$6,740',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Chaqueta Bisonte',
  },
  {
    id: 'hebilla-campeon-1892',
    category: 'Herrajes',
    title: 'Hebilla de latón «Campeón 1892»',
    description: 'Fundida en arena, grabada a buril, folio al reverso.',
    price: '$890',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Hebilla Campeón 1892',
  },
  {
    id: 'chaparreras-coahuila',
    category: 'Cuero',
    title: 'Chaparreras «Coahuila»',
    description: 'Corte batwing, remaches de cobre, ala reforzada.',
    price: '$5,600',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Chaparreras Coahuila',
  },
  {
    id: 'guantes-herradura',
    category: 'Accesorios',
    title: 'Guantes de faena «Herradura»',
    description: 'Piel de venado, costura interior, puño elástico.',
    price: '$620',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Guantes Herradura',
  },
  {
    id: 'espuelas-vaquero',
    category: 'Herrajes',
    title: 'Espuelas templadas «Vaquero»',
    description: 'Acero templado, rodaja de 10 puntas, correas de vaqueta.',
    price: '$1,340',
    was: '$1,690',
    badge: { label: '−20%', tone: 'sale' },
    photo: null,
    photoAlt: 'Espuelas Vaquero',
  },
  {
    id: 'vaqueros-canon-14oz',
    category: 'Denim',
    title: 'Vaqueros rectos «Cañón 14 oz»',
    description: 'Mezclilla de telar angosto, corte para bota, crudo.',
    price: '$1,590',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Vaqueros Cañón 14oz',
  },
  {
    id: 'paliacate-polvo-rojo',
    category: 'Accesorios',
    title: 'Paliacate «Polvo Rojo»',
    description: 'Algodón teñido en rama, 55 cm, dobladillo cosido.',
    price: '$240',
    was: null,
    badge: null,
    photo: null,
    photoAlt: 'Bandana Polvo Rojo',
  },
  {
    id: 'alforja-camino-real',
    category: 'Marroquinería',
    title: 'Alforja encerada «Camino Real»',
    description: 'Lona encerada, esquineras de cuero, hebillas de latón.',
    price: '$2,980',
    was: null,
    badge: { label: 'Nuevo', tone: 'new' },
    photo: null,
    photoAlt: 'Alforja Camino Real',
  },
]

// Reparte los productos en páginas de 6 para el carrusel 3×2.
export const productPages = products.reduce((pages, product, i) => {
  const page = Math.floor(i / PRODUCTS_PER_PAGE)
  pages[page] ??= { id: `pagina-${page + 1}`, items: [] }
  pages[page].items.push(product)
  return pages
}, [])
