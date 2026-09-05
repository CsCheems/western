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
