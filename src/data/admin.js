// Copy y estructura del panel de administración, con la misma regla que
// data/auth.js o data/site.js: las cadenas viven aquí y el JSX las recorre.
//
// Los rótulos de las categorías NO están en este archivo. Vienen del servidor
// junto con su cuenta —GET /admin/categories— porque son datos del catálogo, no
// copy de la interfaz: una categoría nueva tiene que aparecer en el menú sin
// tocar el frontend, que es justo la diferencia entre las dos cosas.

// Rótulo fijo de la barra superior. El equivalente del `authHeader` del modal.
export const adminHeader = 'Panel de administración'

// El menú del usuario, arriba a la izquierda. «Cerrar sesión» no está aquí, y
// por lo mismo que en accountMenu: es una acción, no un enlace.
export const adminUserMenu = [{ label: 'Volver al sitio', icon: 'site', to: '/' }]

// La entrada fija del menú lateral. Debajo de ella el componente pinta las
// categorías que trae la API.
export const adminSidebar = {
  fijos: [
    { label: 'Resumen', icon: 'home', to: '/admin' },
    { label: 'Todo el inventario', icon: 'boxes', to: '/admin/productos' },
    { label: 'Archivados', icon: 'archive', to: '/admin/archivados' },
  ],
  categorias: 'Categorías',
  base: '/admin/productos',
}

/**
 * Las cuatro tarjetas del resumen.
 *
 * `key` es la clave dentro de `metricas` que manda el servidor, y `formato`
 * nombra un formateador de utils/format.js. Añadir una quinta métrica es añadir
 * su clave en admin.service.js y una línea aquí — el componente no cambia.
 */
export const statCards = [
  { key: 'productos', label: 'Productos', hint: 'en el inventario', icon: 'products', formato: 'entero' },
  { key: 'pedidos', label: 'Pedidos', hint: 'en el periodo', icon: 'orders', formato: 'entero' },
  { key: 'ventas', label: 'Ventas', hint: 'artículos vendidos', icon: 'sales', formato: 'entero' },
  { key: 'ingresos', label: 'Ingresos', hint: 'sin pedidos cancelados', icon: 'income', formato: 'moneda' },
]

// Las dos tablas del panel se declaran igual y las pinta el mismo componente.
// `tipo` le dice cómo formatear la celda; `align: 'right'` es para las cifras,
// que se comparan en columna y por eso se alinean por la derecha.
export const productColumns = [
  // La miniatura de la principal, o una raya: de un vistazo se ve qué artículos
  // siguen sin foto.
  { key: 'foto', label: 'Foto', tipo: 'imagen' },
  { key: 'sku', label: 'SKU', tipo: 'codigo' },
  { key: 'titulo', label: 'Artículo', tipo: 'texto' },
  { key: 'precio', label: 'Precio', tipo: 'moneda', align: 'right' },
  { key: 'stock', label: 'Stock', tipo: 'stock', align: 'right' },
  { key: 'estado', label: 'Estado', tipo: 'estado' },
  { key: 'enPortada', label: 'Portada', tipo: 'portada' },
  { key: 'actualizado', label: 'Actualizado', tipo: 'fecha', align: 'right' },
]

export const pedidoColumns = [
  { key: 'folio', label: 'Folio', tipo: 'codigo' },
  { key: 'cliente', label: 'Cliente', tipo: 'texto' },
  { key: 'fecha', label: 'Fecha', tipo: 'fecha' },
  { key: 'articulos', label: 'Artículos', tipo: 'entero', align: 'right' },
  { key: 'total', label: 'Total', tipo: 'moneda', align: 'right' },
  { key: 'estado', label: 'Estado', tipo: 'estado' },
]

// Rótulo y tono de cada estado. Los de producto y los de pedido comparten mapa
// porque comparten la insignia que los pinta; los tonos viven en el componente.
export const estados = {
  activo: { label: 'Activo', tono: 'good' },
  borrador: { label: 'Borrador', tono: 'muted' },
  agotado: { label: 'Agotado', tono: 'warn' },
  pendiente: { label: 'Pendiente', tono: 'warn' },
  enviado: { label: 'Enviado', tono: 'info' },
  entregado: { label: 'Entregado', tono: 'good' },
  cancelado: { label: 'Cancelado', tono: 'muted' },
}

export const adminCopy = {
  resumenTitulo: 'Resumen',
  pedidosTitulo: 'Últimos pedidos',
  pedidosVacio: 'Todavía no hay pedidos en el periodo.',
  stockTitulo: 'Se está acabando',
  stockIntro: (limite) => `Publicados con ${limite} piezas o menos, de menos a más.`,
  stockVacio: 'Nada por debajo del umbral: todo el inventario tiene existencias.',
  stockPiezas: (n) => `${n} ${n === 1 ? 'pieza' : 'piezas'}`,
  inventarioTitulo: 'Todo el inventario',
  inventarioCuenta: (n) => `${n} ${n === 1 ? 'artículo' : 'artículos'}`,
  portadaSi: 'Sí',
  variacionPie: 'respecto al periodo anterior',
  sinFoto: 'Sin foto',
  acciones: 'Acciones',
  nuevo: 'Nuevo artículo',
  editar: 'Editar',
  archivar: 'Archivar',
  restaurar: 'Restaurar',
  archivadosTitulo: 'Archivados',
  archivadosIntro: 'Fuera de la tienda y del inventario. Restaurar los devuelve tal como estaban.',
  archivadosVacio: 'No hay artículos archivados.',
}

// Diálogos de confirmación. Archivar y quitar una imagen se confirman; lo demás
// no, porque se deshace con otro clic.
export const adminConfirm = {
  archivar: {
    titulo: '¿Archivar este artículo?',
    cuerpo: (titulo) =>
      `«${titulo}» saldrá de la tienda y del inventario. Sus datos e imágenes se conservan y puedes restaurarlo desde Archivados.`,
    confirmar: 'Archivar',
    pendiente: 'Archivando…',
  },
  quitarImagen: {
    titulo: '¿Quitar esta imagen?',
    cuerpo: 'Se borra de la galería y del almacenamiento. No se puede deshacer.',
    confirmar: 'Quitar',
    pendiente: 'Quitando…',
  },
  cancelar: 'Cancelar',
}

// Avisos en línea del panel. Toast es de la tienda y no cruza la frontera, así
// que el panel dice lo que pasó en la propia página, arriba de lo que cambió.
export const adminNotices = {
  creado: 'Artículo creado. Ya puedes subir sus imágenes.',
  guardado: (titulo) => `Guardamos los cambios de «${titulo}».`,
  archivado: (titulo) => `«${titulo}» quedó archivado.`,
  restaurado: (titulo) => `«${titulo}» volvió al inventario.`,
  archivadoAviso: 'Este artículo está archivado: no aparece en la tienda ni en el inventario.',
}

// ─── Formulario de artículo ────────────────────────────────────────────────

export const productFormCopy = {
  nuevoTitulo: 'Nuevo artículo',
  nuevoIntro: 'Las imágenes se suben después de crearlo.',
  editarTitulo: 'Editar artículo',
  crear: 'Crear artículo',
  creando: 'Creando…',
  guardar: 'Guardar cambios',
  guardando: 'Guardando…',
  cancelar: 'Cancelar',
  volver: 'Volver al inventario',
  sku: 'SKU',
  secciones: {
    datos: 'Datos',
    clasificacion: 'Clasificación',
    venta: 'Precio y existencias',
    publicacion: 'Publicación',
  },
}

/**
 * Los campos del artículo, en el orden del formulario Y del esquema del servidor
 * (productSchema en backend/validation/admin.schema.js): el primer error que se
 * enfoca tiene que ser el primero que se ve.
 *
 * `options` nombra de qué catálogo salen las opciones de un select; `dependsOn`
 * dice qué campo las filtra; `visibleIf` qué propiedad de la categoría elegida
 * hace que el campo exista. Añadir un campo es añadirlo aquí y en el esquema.
 */
export const productFields = [
  { name: 'titulo', label: 'Título', type: 'text', seccion: 'datos', maxLength: 120 },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', seccion: 'datos', maxLength: 600 },
  {
    name: 'categoria',
    label: 'Categoría',
    type: 'select',
    options: 'categorias',
    placeholder: 'Elige una categoría',
    seccion: 'clasificacion',
  },
  {
    name: 'marca',
    label: 'Marca',
    type: 'select',
    options: 'marcas',
    dependsOn: 'categoria',
    placeholder: 'Elige una marca',
    emptyPlaceholder: 'Primero elige la categoría',
    seccion: 'clasificacion',
  },
  {
    name: 'genero',
    label: 'Género',
    type: 'select',
    options: 'generos',
    visibleIf: 'llevaGenero',
    placeholder: 'Elige el género',
    seccion: 'clasificacion',
  },
  {
    name: 'fieltro',
    label: 'Fieltro',
    type: 'select',
    options: 'fieltros',
    visibleIf: 'admiteFieltro',
    // Opcional: la palma y la lana no se miden en X.
    placeholder: 'Sin fieltro',
    optional: true,
    seccion: 'clasificacion',
  },
  {
    name: 'precio',
    label: 'Precio (MXN)',
    type: 'text',
    inputMode: 'decimal',
    placeholder: '4290',
    seccion: 'venta',
  },
  { name: 'stock', label: 'Piezas en existencia', type: 'text', inputMode: 'numeric', placeholder: '0', seccion: 'venta' },
  {
    name: 'publicado',
    label: 'Publicado en la tienda',
    hint: 'Sin publicar es un borrador: no se ve en la tienda.',
    type: 'checkbox',
    seccion: 'publicacion',
  },
  {
    name: 'enPortada',
    label: 'Destacado en portada',
    hint: 'La portada todavía lee su propia selección; esto la marca para cuando lea de aquí.',
    type: 'checkbox',
    seccion: 'publicacion',
  },
]

/**
 * Mensajes de validación del artículo. Copia LITERAL de los de
 * backend/validation/rules.js: el mismo error dice lo mismo venga de donde
 * venga. El cliente comprueba los de formato; «esta marca no trabaja esa
 * categoría» y compañía no hacen falta aquí porque los selectores solo ofrecen
 * lo que vale, y si algo se cuela, el servidor responde con el suyo.
 */
export const productMessages = {
  required: 'Este campo es obligatorio',
  tituloLargo: 'El título admite hasta 120 caracteres',
  descripcionLarga: 'La descripción admite hasta 600 caracteres',
  precio: 'Escribe un precio mayor que cero, con hasta dos decimales',
  stock: 'Escribe un número entero de piezas, de cero en adelante',
  generoFalta: 'Esta categoría necesita género',
}

// El valor inicial de un artículo nuevo: publicado por omisión, porque lo
// normal es dar de alta algo que se va a vender. El borrador es la excepción.
export const newProductValues = {
  titulo: '',
  descripcion: '',
  categoria: '',
  marca: '',
  genero: '',
  fieltro: '',
  precio: '',
  stock: '',
  publicado: true,
  enPortada: false,
}

// Del artículo que manda la API a los valores del formulario: precio y stock
// vuelven a texto —es lo que edita un input—, y género y fieltro de null a
// cadena vacía, que es la opción «sin elegir» de sus selects.
export function toProductValues(producto) {
  return {
    titulo: producto.titulo,
    descripcion: producto.descripcion,
    categoria: producto.categoria,
    marca: producto.marca,
    genero: producto.genero ?? '',
    fieltro: producto.fieltro ?? '',
    // 2850.5 se edita como «2850.50»: así se escribe un precio.
    precio: Number.isInteger(producto.precio) ? String(producto.precio) : producto.precio.toFixed(2),
    stock: String(producto.stock),
    publicado: producto.publicado,
    enPortada: producto.enPortada,
  }
}

// ─── Galería ───────────────────────────────────────────────────────────────

export const galleryCopy = {
  titulo: 'Imágenes',
  intro: 'La primera es la principal: la que sale en la tarjeta del catálogo. Hasta 8.',
  recomendacion: 'JPG, PNG o WebP de hasta 5 MB. Recomendado: vertical 4:5, de 1000 × 1250 o más.',
  subir: 'Subir imágenes',
  subiendo: (nombre) => `Subiendo ${nombre}…`,
  vacia: 'Este artículo todavía no tiene imágenes.',
  llena: 'La galería está completa. Quita una imagen para subir otra.',
  principal: 'Principal',
  hacerPrincipal: 'Hacer principal',
  quitar: 'Quitar',
  alt: (titulo, n) => `${titulo}, imagen ${n}`,
  // Comprobaciones antes de subir. Tipo y peso bloquean —el servidor los
  // rechazaría igual—; las medidas solo avisan.
  errorTipo: (nombre) => `«${nombre}» no es JPG, PNG ni WebP.`,
  errorPeso: (nombre) => `«${nombre}» pesa más de 5 MB.`,
  avisoMedidas: (nombre, ancho, alto) =>
    `«${nombre}» mide ${ancho} × ${alto}. Se subió, pero en la tarjeta se verá mejor una vertical 4:5 de al menos 1000 × 1250.`,
}

// Los tres estados que necesita cualquier vista que pida datos. El de error
// recibe el ApiError y enseña su `message`, que ya viene escrito para leerse
// —http.js se encarga— tanto si es un 403 como si es la red caída.
export const adminStates = {
  loading: 'Cargando…',
  errorTitulo: 'No pudimos cargar esto',
  reintentar: 'Reintentar',
  vacio: 'No hay artículos en esta categoría.',
}

/**
 * Los dos avisos de /admin.
 *
 * Ya no son pantallas: quien no administra no ve nada de /admin, se le manda a
 * la portada y el aviso es lo único que queda para decir por qué. Sobrevive al
 * cambio de ruta sin que haya que hacer nada — ToastProvider envuelve a
 * AuthProvider, que envuelve a las rutas, así que la pila no se desmonta al
 * navegar.
 *
 * Son dos y no uno porque no dicen lo mismo. A quien no tiene sesión le falta un
 * paso que puede dar; a quien la tiene y no le toca, no. Un texto que valiera
 * para los dos casos tendría que ser tan vago que no serviría para ninguno.
 *
 * `tone: 'error'` porque es uno de los dos únicos que declara Toast.jsx, y de
 * los dos es el que corresponde: no ha salido bien lo que se intentaba.
 */
export const adminToasts = {
  anonimo: {
    tone: 'error',
    title: 'Zona restringida',
    body: 'Entra con una cuenta del equipo para ver el panel.',
  },
  cliente: {
    tone: 'error',
    title: 'Esta zona es del equipo',
    body: 'Tu cuenta no tiene permisos de administración. Si crees que debería tenerlos, habla con quien lleva la tienda.',
  },
}

// Cerrar sesión no tiene aviso propio aquí: sale de data/auth.js tal cual, porque
// cerrar sesión es lo mismo se haga desde donde se haga, y dos textos para una
// misma acción es como acaban diciendo cosas distintas.
