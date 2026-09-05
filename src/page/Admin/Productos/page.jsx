import { useCallback } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { AdminState } from '../../../components/admin/AdminState'
import { AdminTable } from '../../../components/admin/AdminTable'
import { adminCopy, adminStates, productColumns } from '../../../data/admin'
import { useApiResource } from '../../../hooks/useApiResource'
import { getProducts } from '../../../services/admin'

/**
 * El inventario, entero o de una categoría. Las dos rutas —/admin/productos y
 * /admin/productos/:categoria— comparten esta página: lo único que cambia es un
 * parámetro, y partirlas en dos archivos sería duplicar la tabla para filtrarla.
 *
 * El fetcher se envuelve en useCallback con `categoria` de dependencia, y ahí
 * está toda la mecánica del filtro: al pulsar otra categoría cambia el
 * parámetro, cambia el fetcher, y useApiResource vuelve a pedir por su cuenta.
 * La página no tiene ningún efecto propio ni se acuerda de recargar nada.
 *
 * El rótulo NUNCA se reconstruye a partir de la URL: diría «Hebillas» donde la
 * tienda dice «Hebillas y espuelas». Sale del menú lateral —que ya lo tiene, y
 * por eso baja por el contexto del Outlet— y, si esa petición aún no ha llegado,
 * de la respuesta propia. Mientras no se sepa, el hueco se queda vacío con su
 * alto reservado: preferimos un título en blanco medio segundo a uno que diga
 * «Todo el inventario» y se desdiga.
 *
 * Una categoría inventada en la URL responde 404, y eso se enseña como error con
 * su «no encontramos lo que buscabas», no como una tabla vacía: son dos cosas
 * distintas y la segunda haría pasar por buena una dirección mal escrita.
 */
export default function AdminProductos() {
  const { categoria } = useParams()
  const { categorias } = useOutletContext()

  const fetcher = useCallback((options) => getProducts(categoria, options), [categoria])
  const { data, status, error, reload } = useApiResource(fetcher)

  const delMenu = categorias?.find((entrada) => entrada.id === categoria)?.label
  const titulo = categoria ? (delMenu ?? data?.categoria?.label ?? '') : adminCopy.inventarioTitulo

  return (
    <>
      <header className="mb-[18px]">
        <h1 className="min-h-[22px] text-[22px] leading-none text-admin-ink">{titulo}</h1>
        <p className="mt-[6px] min-h-[18px] text-[13px] text-admin-muted">
          {status === 'ready' ? adminCopy.inventarioCuenta(data.items.length) : null}
        </p>
      </header>

      {status !== 'ready' ? (
        <AdminState status={status} error={error} onRetry={reload} />
      ) : (
        <AdminTable
          columns={productColumns}
          rows={data.items}
          rowKey="id"
          empty={adminStates.vacio}
        />
      )}
    </>
  )
}
