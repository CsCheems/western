import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ToastProvider } from './context/ToastProvider'
import Admin from './page/Admin/page'
import AdminProductos from './page/Admin/Productos/page'
import AdminResumen from './page/Admin/Resumen/page'
import Catalog from './page/Catalog/page'
import Home from './page/Home/page'
import Profile from './page/Profile/page'

// Los avisos van por fuera de la sesión: el modal de acceso los usa, pero la
// bolsa y el checkout también los van a necesitar.
//
// Los dos providers envuelven a las rutas y no al revés: el modal de acceso vive
// dentro de AuthProvider, así que se puede abrir desde cualquier página y
// sobrevive a la navegación entre ellas.
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/perfil" element={<Profile />} />

            {/* /admin es una ruta CON HIJAS: la de arriba decide quién pasa y
                pone la cáscara del panel, y las de dentro son lo que cambia. Así
                la guardia se escribe una sola vez, y una sección nueva del panel
                nace protegida por estar donde está — igual que en el servidor,
                donde los dos filtros cuelgan del router y no de cada ruta. */}
            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminResumen />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="productos/:categoria" element={<AdminProductos />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
