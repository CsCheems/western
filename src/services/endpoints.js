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
    // GET lee la sesión; PUT guarda la edición del perfil.
    me: '/auth/me',
  },
  products: {
    list: '/products',
    detail: (id) => `/products/${id}`,
  },
  // Países y estados para los desplegables del alta y del perfil. Sin sesión.
  ubicaciones: '/ubicaciones',
  // Todo lo de aquí va detrás de requireAuth + requireAdmin en el servidor: sin
  // sesión da 401 y con sesión de cliente da 403.
  admin: {
    summary: '/admin/summary',
    categories: '/admin/categories',
    products: '/admin/products',
  },
}
