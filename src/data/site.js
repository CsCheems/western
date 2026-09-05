import { marcas } from './catalog'

export const announcements = [
  'Envío gratis desde $2,500',
  'Cambios sin costo · 30 días',
  'Hecho a mano',
]

/**
 * El navbar. Cada entrada con `children` es un desplegable; la de `to` es un
 * enlace suelto.
 *
 * LOS HIJOS LLEVAN SOLO EL DELTA. El componente fusiona `{ ...item.params,
 * ...child.params }`, así que «Botas ▸ Damas» sale de combinar la categoría del
 * padre con el género del hijo, y no hay que repetir la categoría cinco veces ni
 * arriesgarse a escribirla distinta en una de ellas.
 *
 * `params` del padre es lo que filtra su «Ver todo». Cuando el menú agrupa
 * varias categorías —Ropa, Accesorios— lleva un array, que catalogPath convierte
 * en la clave repetida que el catálogo lee con getAll().
 *
 * Las cinco entradas cubren las nueve categorías del inventario: ninguna pieza
 * queda sin puerta desde el navbar.
 */
export const navLinks = [
  { key: 'inicio', label: 'Inicio', to: '/' },
  {
    key: 'botas',
    label: 'Botas',
    params: { categoria: 'botas' },
    children: [
      { label: 'Damas', params: { genero: 'dama' } },
      { label: 'Caballeros', params: { genero: 'caballero' } },
    ],
  },
  {
    key: 'sombreros',
    label: 'Sombreros',
    params: { categoria: 'sombreros' },
    children: [
      { label: '2X', params: { fieltro: '2x' } },
      { label: '4X', params: { fieltro: '4x' } },
      { label: '6X', params: { fieltro: '6x' } },
      { label: '10X', params: { fieltro: '10x' } },
      { label: '100X', params: { fieltro: '100x' } },
      { label: '1000X', params: { fieltro: '1000x' } },
      // Palma y lana no llevan X —la escala es del fieltro—, así que esta entrada
      // filtra solo por categoría y se queda con el «Ver todo» del padre.
      { label: 'Palma y lana', params: {} },
    ],
  },
  {
    key: 'ropa',
    label: 'Ropa',
    params: { categoria: ['camisas', 'abrigos', 'denim'] },
    children: [
      { label: 'Camisas', params: { categoria: 'camisas' } },
      { label: 'Chamarras y abrigos', params: { categoria: 'abrigos' } },
      { label: 'Denim', params: { categoria: 'denim' } },
    ],
  },
  {
    key: 'accesorios',
    label: 'Accesorios',
    params: { categoria: ['hebillas', 'cinturones', 'monturas', 'accesorios'] },
    children: [
      { label: 'Hebillas y espuelas', params: { categoria: 'hebillas' } },
      { label: 'Cintos', params: { categoria: 'cinturones' } },
      { label: 'Monturas', params: { categoria: 'monturas' } },
      { label: 'Cuero y faena', params: { categoria: 'accesorios' } },
    ],
  },
  {
    key: 'marcas',
    label: 'Marcas',
    children: marcas.map((taller) => ({ label: taller.label, params: { marca: taller.id } })),
  },
]

// Seis casas de familia entre Texas, Chihuahua y Zacatecas. Nombres ficticios.
//
// Se DERIVAN del catálogo de marcas en vez de repetirlos —igual que
// profileSections deriva de las secciones del alta—: la banda de la portada y el
// menú del navbar nombran a los mismos talleres, y con dos listas acabarían
// nombrándolos distinto.
export const workshops = marcas.map((taller) => taller.label)

export const promises = [
  {
    icon: 'truck',
    title: 'Envío en 48 horas',
    note: 'Gratis desde $2,500 en toda la República',
  },
  {
    icon: 'shield',
    title: 'Garantía de taller',
    note: 'Dos años en costuras y herrajes',
  },
  {
    icon: 'refresh',
    title: 'Cambios sin costo',
    note: '30 días para dar con tu talla',
  },
]

export const footerColumns = [
  {
    title: 'Tienda',
    links: [
      { label: 'Botas y calzado', href: '#catalogo' },
      { label: 'Sombreros de fieltro', href: '#catalogo' },
      { label: 'Cintos y hebillas', href: '#catalogo' },
      { label: 'Camisas y denim', href: '#catalogo' },
      { label: 'Marroquinería', href: '#catalogo' },
      { label: 'Rebajas de temporada', href: '#catalogo', highlight: true },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Guía de tallas', href: '#' },
      { label: 'Envíos y entregas', href: '#' },
      { label: 'Cambios y devoluciones', href: '#' },
      { label: 'Cuidado del cuero', href: '#' },
      { label: 'Rastrear pedido', href: '#' },
    ],
  },
  {
    title: 'La casa',
    links: [
      { label: 'Nuestro taller', href: '#marcas' },
      { label: 'Talleres aliados', href: '#marcas' },
      { label: 'Tienda en Saltillo', href: '#' },
      { label: 'Mayoreo', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
]

export const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'Oxxo', '3 MSI']

// Los tres se dibujan en components/ui/SocialIcons: lucide v1 ya no trae
// marcas comerciales.
export const socialLinks = [
  { label: 'Instagram', icon: 'instagram', href: '#' },
  { label: 'YouTube', icon: 'youtube', href: '#' },
  { label: 'WhatsApp', icon: 'whatsapp', href: '#' },
]
