import { useMemo, useState } from 'react'
import { CatalogFilters } from '../../components/catalog/CatalogFilters'
import { CatalogGrid } from '../../components/catalog/CatalogGrid'
import { CatalogHero } from '../../components/catalog/CatalogHero'
import { CatalogState } from '../../components/catalog/CatalogState'
import { CatalogToolbar } from '../../components/catalog/CatalogToolbar'
import { AnnouncementBar } from '../../components/layout/AnnouncementBar'
import { Footer } from '../../components/layout/Footer'
import { Navbar } from '../../components/layout/Navbar'
import { catalogCopy } from '../../data/catalog'
import { useApiResource } from '../../hooks/useApiResource'
import { useCatalogFilters } from '../../hooks/useCatalogFilters'
import { getCatalog } from '../../services/catalog'
import { filtrarProductos, indexar } from '../../utils/catalog'

/**
 * El catálogo entero. La misma cáscara que la portada —anuncio, navbar, footer—;
 * lo que cambia es que esta página SÍ pide sus datos al servidor, y es la primera
 * de la tienda que lo hace.
 *
 * SE PIDE UNA VEZ Y SE FILTRA EN MEMORIA. `getCatalog` es una función de módulo
 * sin argumentos, así que es una referencia estable y cambiar un filtro no cambia
 * el fetcher: useApiResource no vuelve a pedir nunca. Es lo que permite que el
 * deslizador de precio responda al arrastre en vez de esperar a la red, y lo que
 * hace que las cuentas de las casillas sean las del catálogo entero —si
 * encogieran al filtrar, nadie sabría qué se está perdiendo—.
 *
 * `abierto` es estado local y no un parámetro de la URL: si el raíl está
 * desplegado es un modo de la interfaz, no un filtro, y compartir un enlace no
 * debe abrirle el panel a quien lo reciba.
 */
export default function Catalog() {
  const { data, status, error, reload } = useApiResource(getCatalog)
  const { filtros, activos, acciones } = useCatalogFilters()
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)

  // Una vez por respuesta: los mapas de rótulo y la cadena de búsqueda ya
  // normalizada de cada pieza. Filtrar después no vuelve a tocar ninguna de las
  // dos cosas.
  const catalogo = useMemo(() => (data ? indexar(data) : null), [data])

  const resultados = useMemo(
    () => (catalogo ? filtrarProductos(catalogo.items, filtros, catalogo.facetas.precio) : []),
    [catalogo, filtros],
  )

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <AnnouncementBar />
      <Navbar />

      <main>
        <CatalogHero />

        <section className="bg-paper px-gutter py-[clamp(38px,5vw,72px)] text-ink">
          <div className="mx-auto max-w-shell">
            {status !== 'ready' ? (
              <CatalogState status={status} error={error} onRetry={reload} />
            ) : (
              <>
                {/* La barra va por encima de las dos columnas, y eso resuelve un
                    detalle de móvil: si el botón «Filtros» estuviera debajo del
                    raíl, abrirlo lo empujaría hacia abajo y se movería justo bajo
                    el dedo que acaba de pulsarlo. */}
                <CatalogToolbar
                  count={resultados.length}
                  total={catalogo.total}
                  activos={activos}
                  rotulos={catalogo.rotulos}
                  precio={catalogo.facetas.precio}
                  filtros={filtros}
                  acciones={acciones}
                  filtrosAbiertos={filtrosAbiertos}
                  onToggleFiltros={() => setFiltrosAbiertos((abierto) => !abierto)}
                />

                <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-[clamp(24px,2.6vw,44px)]">
                  {/* `self-start` no es adorno: sin él la columna se estira a lo
                      alto de la fila y el sticky se queda sin recorrido. */}
                  <aside
                    aria-label={catalogCopy.filtros}
                    className={`${filtrosAbiertos ? 'mb-[28px] block' : 'hidden'} lg:sticky lg:top-[92px] lg:mb-0 lg:block lg:max-h-[calc(100vh-112px)] lg:self-start`}
                  >
                    <CatalogFilters
                      facetas={catalogo.facetas}
                      filtros={filtros}
                      acciones={acciones}
                    />
                  </aside>

                  <CatalogGrid
                    items={resultados}
                    rotulos={catalogo.rotulos}
                    onLimpiar={acciones.limpiar}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
