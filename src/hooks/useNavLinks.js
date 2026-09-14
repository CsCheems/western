import { useMemo } from 'react'
import { navLinks } from '../data/site'
import { getMarcas } from '../services/marcas'
import { useApiResource } from './useApiResource'

/**
 * Los menús del navbar con los talleres dentro de «Marcas».
 *
 * Los demás menús son copy y viven enteros en data/site.js; los hijos de
 * «Marcas» son datos, y llegan de la base: una marca nueva sale aquí en cuanto
 * tiene algo publicado, sin tocar el frontend.
 *
 * Mientras la lista no llega —o si no llega— el menú se queda con su «Ver todo»,
 * que la entrada declara en data/site.js: se puede abrir en cualquier momento y
 * nunca aparece vacío.
 */
export function useNavLinks() {
  const { data } = useApiResource(getMarcas)

  return useMemo(() => {
    const marcas = data?.marcas ?? []

    return navLinks.map((item) =>
      item.key === 'marcas'
        ? { ...item, children: marcas.map((taller) => ({ label: taller.label, params: { marca: taller.id } })) }
        : item,
    )
  }, [data])
}
