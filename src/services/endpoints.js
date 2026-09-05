// Mapa único de rutas de la API. Ningún componente ni servicio escribe una URL
// a mano: si el backend renombra algo, se cambia aquí y en ningún otro sitio.
//
// Las rutas con parámetro son funciones, para que la interpolación viva también
// en este archivo.

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  products: {
    list: '/products',
    detail: (id) => `/products/${id}`,
  },
  // Todo lo de aquí va detrás de requireAuth + requireAdmin en el servidor: sin
  // sesión da 401 y con sesión de cliente da 403.
  admin: {
    summary: '/admin/summary',
    categories: '/admin/categories',
    products: '/admin/products',
  },
}
