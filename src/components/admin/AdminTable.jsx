import { adminCopy } from '../../data/admin'
import { formatDate, formatInteger, formatMoney } from '../../utils/format'
import { AdminBadge } from './AdminBadge'
import { AdminCard } from './AdminCard'

// Clases por tipo de celda. Las cifras van en tabular-nums para que se comparen
// en columna, que es lo único que hace a una tabla mejor que una lista.
const CELDAS = {
  codigo: 'text-[12px] text-admin-muted tabular-nums whitespace-nowrap',
  texto: 'text-admin-ink',
  moneda: 'tabular-nums whitespace-nowrap',
  entero: 'tabular-nums',
  stock: 'tabular-nums',
  estado: 'whitespace-nowrap',
  portada: 'text-admin-muted whitespace-nowrap',
  fecha: 'text-admin-muted whitespace-nowrap',
}

/**
 * El contenido de una celda según el `tipo` que declara su columna.
 *
 * El stock en cero se pinta en ámbar; por debajo de ningún otro número. El
 * umbral de «se está acabando» lo fija el servidor (LIMITE_STOCK en
 * admin.service.js) y lo enseña el resumen con su propio panel — copiarlo aquí
 * crearía un segundo umbral que se desincroniza el día que cambie el primero.
 * Cero no es un umbral, es un hecho.
 */
function contenido(fila, columna) {
  const valor = fila[columna.key]

  switch (columna.tipo) {
    case 'moneda':
      return formatMoney(valor)
    case 'entero':
      return formatInteger(valor)
    case 'fecha':
      return formatDate(valor)
    case 'estado':
      return <AdminBadge estado={valor} />
    case 'portada':
      return valor ? adminCopy.portadaSi : '—'
    case 'stock':
      return (
        <span className={valor === 0 ? 'text-admin-warn' : undefined}>{formatInteger(valor)}</span>
      )
    default:
      return valor
  }
}

/**
 * La tabla del panel, la misma para el inventario y para los pedidos: las dos se
 * declaran como columnas en data/admin.js y de ahí salen el rótulo, el formato y
 * la alineación. Dos tablas casi iguales acaban divergiendo en el relleno de una
 * celda, y luego nadie sabe cuál de las dos era la buena.
 *
 * Todas son de SOLO LECTURA. No hay editar, crear ni borrar, y es a propósito:
 * escribir contra un mock en memoria da la impresión de que algo se guardó.
 *
 * Una tabla ancha no cabe en un teléfono y no se intenta que quepa: se desplaza
 * dentro de su propia tarjeta —de ahí el overflow-x-auto—, que es lo que impide
 * que arrastre a la página entera en horizontal. Reventar las filas en tarjetas
 * apiladas pierde justo lo que se venía a hacer, que es comparar una columna.
 */
export function AdminTable({ columns, rows, rowKey, empty }) {
  if (rows.length === 0) {
    return (
      <AdminCard className="grid min-h-[120px] place-items-center p-6">
        <p className="text-center text-[13px] text-admin-muted">{empty}</p>
      </AdminCard>
    )
  }

  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-admin-line bg-admin-canvas">
              {columns.map((columna) => (
                <th
                  key={columna.key}
                  scope="col"
                  className={`px-4 py-[10px] text-[11px] font-normal tracking-wide text-admin-muted uppercase whitespace-nowrap ${columna.align === 'right' ? 'text-right' : ''}`}
                >
                  {columna.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((fila) => (
              <tr
                key={fila[rowKey]}
                className="border-t border-admin-line transition-colors first:border-t-0 hover:bg-admin-canvas/70"
              >
                {columns.map((columna) => (
                  <td
                    key={columna.key}
                    className={`px-4 py-[11px] ${CELDAS[columna.tipo] ?? ''} ${columna.align === 'right' ? 'text-right' : ''}`}
                  >
                    {contenido(fila, columna)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  )
}
