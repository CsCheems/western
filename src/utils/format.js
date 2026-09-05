// Formato de cifras del panel. La API manda números pelados —el precio es 4290,
// no '$4,290'— justamente para que se puedan sumar; ponerles la forma es cosa de
// la pantalla, y de un solo archivo.
//
// Los formateadores se crean UNA VEZ, fuera de las funciones. Construir un
// Intl.NumberFormat es caro y una tabla de treinta y tres filas lo llamaría
// treinta y tres veces por render.
//
// Locale es-MX fijo, no el del navegador: el sitio declara <html lang="es-MX"> y
// los precios son en pesos. Con el locale del cliente, la misma tienda enseñaría
// «4,290.00» a unos y «4.290,00» a otros.

const MONEDA = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

const ENTERO = new Intl.NumberFormat('es-MX')

const FECHA = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' })

export const formatMoney = (valor) => MONEDA.format(valor)

export const formatInteger = (valor) => ENTERO.format(valor)

// Con signo siempre, también en positivo: «+18.5%» y «−12%» se leen como lo que
// son de un vistazo, y un «18.5%» suelto no dice si subió o bajó.
export const formatPercent = (valor) => `${valor > 0 ? '+' : ''}${ENTERO.format(valor)}%`

/**
 * Las fechas llegan como '2026-09-04'. Se parte a mano en vez de pasarla a
 * `new Date(cadena)`: ese constructor lee una fecha sin hora como UTC y la pinta
 * en la zona local, así que en México —seis husos por detrás— un 4 de septiembre
 * se enseña como 3 de septiembre. El fallo clásico, y silencioso.
 */
export function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)

  return FECHA.format(new Date(year, month - 1, day))
}

export const FORMATOS = {
  moneda: formatMoney,
  entero: formatInteger,
}
