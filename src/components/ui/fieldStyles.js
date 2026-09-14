// Receta visual de los controles de formulario sobre oscuro. La comparten el
// input de Field y el disparador de Select, que tienen que ser indistinguibles
// en reposo: una lista es un campo más del formulario, no un botón.
//
// Vive en un .js aparte y no dentro de Field.jsx porque un archivo que exporta
// componentes y constantes a la vez deja sin fast refresh a los dos.

// La receta de input sobre oscuro del buscador del navbar y del boletín. A
// diferencia de aquellas no lleva `outline-none`, para recuperar el anillo
// dorado que `:focus-visible` da a todo el sitio desde index.css.
//
// El fondo no está aquí sino en el mapa de tonos: cambia con el estado.
export const INPUT =
  'h-[42px] w-full min-w-0 border px-3 text-[13px] text-paper transition-colors placeholder:text-sand disabled:cursor-not-allowed disabled:text-sand'

export const TONES = {
  // Reposo: hairline de riel que se aclara al pasar por encima.
  idle: 'border-rail bg-rail/28 hover:border-buck',
  // Error: óxido, no granero. Granero sobre el panel da 1.75:1 y desaparece.
  error: 'border-rust bg-rail/28',
  // Solo lectura: sin hover —un campo que no se puede escribir no debe
  // iluminarse al pasar el ratón, porque eso es una promesa— y el fondo más
  // plano, para que se lea como dato y no como control esperando escritura. El
  // texto sí se queda en `paper`: es información real, no algo apagado.
  readonly: 'border-rail/55 bg-rail/12',
}
