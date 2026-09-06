import { useEffect, useState } from 'react'
import { campoBusqueda, catalogCopy, filterGroups } from '../../data/catalog'
import { Field } from '../ui/Field'
import { Frame } from '../ui/Frame'
import { FilterGroup, FilterToggle } from './FilterGroup'
import { PriceRange } from './PriceRange'

const RETARDO_BUSQUEDA = 250

/**
 * El raíl de filtros, sobre oscuro.
 *
 * Que sea oscuro no es un capricho de contraste con la hoja de papel: es lo que
 * permite reusar `Field` sin tocarlo —su receta es explícitamente «sobre
 * oscuro»— y que las casillas se pinten con tonos que ya existen. Sobre papel
 * habría que añadir un tono nuevo al mapa de Field y otro a la casilla, y el
 * sistema crecería dos piezas para no ganar nada.
 *
 * EL RAÍL SE PINTA ENTERO Y NO TIENE SCROLL PROPIO. Tuvo `max-height` y
 * `overflow-y: auto`, y los dos se fueron a la vez, por este orden de razones:
 *
 *   · El `max-height` no llegaba a funcionar. Estaba puesto en el <aside> y aquí
 *     se heredaba con `max-h-full`, pero un `max-height` en porcentaje se
 *     resuelve contra la ALTURA del contenedor, y la del <aside> era `auto`
 *     —llevar un max-height no es tener altura—. El porcentaje se computaba a
 *     `none`, este Frame crecía hasta 1148px dentro de un hueco de 816 y se
 *     salía 332px por abajo, encima del footer.
 *   · Aun arreglado, sobraba. Ocho grupos de casillas dentro de una caja con su
 *     propia barra son dos scrolls anidados sobre el mismo gesto de rueda, y la
 *     lista de filtros no es tan larga como para pagar eso.
 *
 * La regla que queda: este raíl mide lo que mide su contenido, y quien lo monte
 * se encarga de que quepa. Nada de overflow aquí dentro —las marcas de registro
 * del Frame sobresalen 6px y cualquier recorte se las come—.
 */
export function CatalogFilters({ facetas, filtros, acciones }) {
  // El buscador escribe en la URL con retardo, así que necesita su propio estado
  // mientras tanto. `visto` recuerda qué decía la URL la última vez que se miró:
  // cuando cambia por fuera —navbar, botón atrás, «limpiar filtros»— el input se
  // pone al día.
  //
  // El ajuste va en el render y no en un efecto, que es el patrón que React
  // documenta para esto y además lo que exige react-hooks/set-state-in-effect.
  const [texto, setTexto] = useState(filtros.q)
  const [visto, setVisto] = useState(filtros.q)

  if (filtros.q !== visto) {
    setVisto(filtros.q)
    setTexto(filtros.q)
  }

  useEffect(() => {
    if (texto === visto) return

    const id = setTimeout(() => acciones.buscar(texto), RETARDO_BUSQUEDA)

    return () => clearTimeout(id)
  }, [texto, visto, acciones])

  return (
    <Frame markClass="text-buck" className="flex flex-col border-buck/32 bg-panel">
      <div className="flex flex-col gap-[22px] px-[18px] py-[20px]">
        <Field field={campoBusqueda} value={texto} onChange={(_, valor) => setTexto(valor)} />

        <PriceRange
          bounds={facetas.precio}
          value={{ min: filtros.min, max: filtros.max }}
          onChange={acciones.precio}
        />

        <FilterToggle
          label={catalogCopy.disponibles}
          count={facetas.disponibles}
          checked={filtros.disponibles}
          onChange={acciones.disponibilidad}
        />

        {/* Los grupos salen de una declaración: añadir uno es una línea en
            data/catalog.js y este componente no cambia. */}
        {filterGroups.map((grupo) => (
          <FilterGroup
            key={grupo.param}
            title={grupo.title}
            options={facetas[grupo.facet]}
            selected={filtros[grupo.param]}
            onToggle={(valor) => acciones.alternar(grupo.param, valor)}
          />
        ))}
      </div>
    </Frame>
  )
}
