# Handoff: Rincón del Oeste — Home (ecommerce western)

## Overview
Página de inicio para una tienda en línea de ropa y herrajes estilo western/cowboy (marca ficticia **Rincón del Oeste**, Saltillo, Coahuila). Copy en español (es-MX). Contiene, en orden: barra de avisos, navbar sticky, hero con carrusel en loop, sección de marcas/talleres, catálogo de 12 productos en carrusel de páginas 3×2, y footer con promesas, newsletter, enlaces y barra legal.

## About the Design Files
Los archivos de este paquete son **referencias de diseño hechas en HTML** — prototipos que muestran la apariencia y el comportamiento buscados, **no código de producción para copiar tal cual**. La tarea es **recrear estos diseños en el entorno del codebase destino** (React/Next, Vue, Astro, Shopify/Hydrogen, etc.) usando sus patrones, componentes y librerías ya establecidos. Si aún no existe un entorno, elige el framework más adecuado al proyecto e impleméntalo ahí.

Notas técnicas del prototipo que **no** deben trasladarse literalmente:
- Todo el estilo está escrito **inline** por requisitos de la herramienta de diseño. En producción usa la solución de estilos del codebase (CSS Modules, Tailwind, styled-components…) y los tokens de la sección *Design Tokens*.
- Los carruseles se manipulan con DOM imperativo (`insertBefore`/`appendChild` + `transform`). En React/Vue reimplementa la misma **lógica** (ver *Interactions & Behavior*) de forma declarativa o con una librería (Embla, Keen-Slider, Swiper), respetando el comportamiento de loop.
- `image-slot.js` es un placeholder de imágenes propio del entorno de diseño. En producción sustitúyelo por `<img>`/`next/image` con las fotos reales.

## Fidelity
**High-fidelity (hifi).** Colores, tipografía, medidas, estados y copy son finales. Recrea la UI con fidelidad de píxel usando las librerías del codebase. Lo único pendiente son las **fotografías reales** (el prototipo usa placeholders).

## Screens / Views

### 1. Barra de avisos (top strip)
- **Propósito**: mensajes de confianza siempre visibles.
- **Layout**: flex centrado, `gap: 28px`, `padding: 9px 20px`. Separadores: `<span>` de `1px × 12px` en `rgba(237,217,176,.4)`.
- **Estilo**: fondo `#8B1E1E`, texto `#EDD9B0`, 12px, `letter-spacing:.18em`, mayúsculas.
- **Copy**: "Envío gratis desde $2,500" · "Cambios sin costo · 30 días" · "Hecho a mano desde 1892".

### 2. Navbar (sticky)
- **Propósito**: navegación de categorías, búsqueda, cuenta y bolsa.
- **Layout**: `position:sticky; top:0; z-index:30`, fondo `rgba(30,27,23,.97)` + `backdrop-filter: blur(6px)`, borde inferior `1px solid #4B2E20`. Contenedor interno `max-width:1360px; margin:0 auto; padding:0 clamp(20px,4vw,56px)`, `display:flex; align-items:center; gap:clamp(14px,2.2vw,40px); height:78px`.
- **Marca** (izquierda, `margin-right:auto`, `flex:0 0 auto`, `white-space:nowrap`): "Rincón / del Oeste" en **Rye 21px**, `line-height:1.08`, color `#E6B442`, en dos líneas (`<br>`); debajo "EST. 1892" 10px, `letter-spacing:.36em`, mayúsculas, `#A39884`, `margin-top:6px`.
- **Nav** (`flex:0 0 auto`, `flex-wrap:nowrap`, `gap:clamp(10px,1.4vw,26px)`, 12px, `letter-spacing:.1em`, mayúsculas): Botas · Sombreros · Cuero · Herrajes · **Rebajas** (esta en `#D24A22`). Enlaces `#EDE3D2`, `padding:6px 0`, `border-bottom:1px solid transparent`; **hover**: color `#E6B442` + `border-bottom-color:#E6B442`.
- **Acciones** (`flex:0 0 auto`, `gap:8px`):
  - Buscador: caja `height:38px; padding:0 10px; border:1px solid #4B2E20; background:rgba(75,46,32,.28); width:clamp(92px,11vw,200px)`; icono lupa 15px + input transparente 13px, placeholder "Buscar", texto `#EDE3D2`.
  - Botón cuenta: 38×38, `border:1px solid #4B2E20`, icono usuario 17px `#EDE3D2`; **hover** `border-color:#C7A06A; background:rgba(199,160,106,.12)`.
  - CTA Bolsa: `height:38px; padding:0 14px`, fondo `#E6B442`, borde `#E6B442`, texto `#1E1B17` 13px `letter-spacing:.12em` mayúsculas, icono bolsa 16px + contador (`min-width:18px; height:18px`, fondo `#8B1E1E`, texto `#F6E7CE` 11px, valor "3"); **hover** fondo/borde `#D24A22`, texto `#F6E7CE`.
- **Restricción medida**: la fila suma ~870px de contenido; cabe sin recortes desde ~900px de viewport. Por debajo de eso, colapsa el buscador a botón‑icono y/o mueve la nav a un menú.

### 3. Hero — carrusel en loop (3 slides)
- **Layout**: viewport `overflow:hidden; height:clamp(560px,76vh,740px)`; track `display:flex; height:100%`, cada slide `flex:0 0 100%`.
- **Fondo por slide**: contenedor absoluto con la foto (`object-fit: cover`), encima:
  1. capa duotono: `background:#8C5A3A; mix-blend-mode:color` (`pointer-events:none`),
  2. degradado: `linear-gradient(96deg, rgba(30,27,23,.95) 0%, rgba(30,27,23,.78) 40%, rgba(30,27,23,.18) 100%)`.
- **Placa de copy**: `max-width:600px`, `padding:clamp(26px,3vw,46px)`, borde `1px solid rgba(199,160,106,.5)`, esquinas cuadradas + 4 marcas de registro "+" en `#E6B442` (ver *Blueprint frame*). Dentro: kicker 12px `letter-spacing:.24em` mayúsculas `#E6B442`; regla `1px` `rgba(199,160,106,.4)` con `margin:14px 0 22px`; **h1 en Rye 400**, `clamp(38px,4.6vw,68px)`, `line-height:1.06`, `#EDE3D2`; párrafo 16px/1.6 `#C7BBA4`, `max-width:44ch`, `margin-top:20px`; fila de botones `gap:12px`, `margin-top:30px`.
- **Botones**: primario `padding:14px 24px`, fondo/borde `#E6B442`, texto `#1E1B17` 13px `letter-spacing:.16em` mayúsculas + flecha 15px; **hover** `#D24A22` con texto `#F6E7CE`. Secundario: transparente, borde `#C7A06A`, texto `#EDE3D2`; **hover** `background:rgba(199,160,106,.14); border-color:#E6B442`.
- **Contenido de los slides** (orden de secuencia 1→2→3):
  1. `01 · TEMPORADA DE POLVO` — "Cuero que aguanta el camino" — botones: Ver botas / Catálogo completo.
  2. `02 · SOMBRERERÍA` — "Fieltro 6X, moldeado a vapor" — Ver sombreros / Guía de tallas.
  3. `03 · TALLER DE HERRAJES` — "Latón macizo, grabado a mano" — Ver herrajes / El taller.
- **Controles**: flechas 46×46 a `left/right:clamp(10px,1.6vw,22px)`, `top:50%`, `translateY(-50%)`, borde `rgba(199,160,106,.55)`, fondo `rgba(30,27,23,.55)`; **hover** fondo/borde `#E6B442`. Puntos: 3 barras de `44×4px`, inactivas `rgba(237,227,210,.35)`, activa `#E6B442` y `height:5px`, centradas a `bottom:26px`, `gap:14px`.

### 4. Marcas / talleres
- **Layout**: fondo `#26221C`, bordes superior e inferior `1px solid #4B2E20`, `padding:clamp(40px,5vw,66px) clamp(20px,4vw,56px)`; interior `max-width:1360px`.
- **Encabezado**: kicker `04 · LAS CASAS` (12px, `.24em`, `#C7A06A`) + **h2 Rye** `clamp(26px,2.6vw,38px)` `#EDE3D2`; a la derecha, párrafo 14px/1.6 `#A39884`, `max-width:38ch`.
- **Placa**: `margin-top:38px`, `display:grid; grid-template-columns:repeat(6,1fr)`, borde `1px solid rgba(199,160,106,.32)` + 4 marcas de registro `#C7A06A`. Cada celda: `height:104px`, centrada, **Rye** `clamp(13px,1.05vw,17px)`, color `#A39884`, divisor izquierdo `1px solid rgba(199,160,106,.22)` (salvo la primera); **hover** color `#E6B442`, fondo `rgba(199,160,106,.07)`.
- **Nombres**: Bishop & Cole · Cañón Hats · Broncoware · Ferrería del Norte · Sabinal Denim · Old Cavalry.

### 5. Catálogo — carrusel de páginas 3×2 (12 productos)
- **Sección**: fondo papel `#EDE3D2`, texto `#1E1B17`, `padding:clamp(52px,6vw,86px) clamp(20px,4vw,56px)`, interior `max-width:1360px`.
- **Encabezado**: kicker `05 · CATÁLOGO` en `#8B1E1E`; **h2 Rye** `clamp(28px,3vw,44px)` "Doce piezas de temporada"; a la derecha contador `01 / 02` (13px, `.2em`, `#5C5A4E`) y dos botones 42×42 con borde `#8C5A3A` (**hover** fondo/borde `#8B1E1E`). Debajo, regla `1px rgba(75,46,32,.28)` con `margin:26px 0 44px`.
- **Track**: viewport `overflow:hidden; margin:0 -8px; padding:0 8px` (aire para las marcas de registro); cada página `flex:0 0 100%`, `display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(22px,2.4vw,36px)` → 6 productos por página, 2 páginas.
- **Tarjeta de producto** (marco blueprint, fondo transparente, borde `rgba(75,46,32,.3)`; **hover** `border-color:#8C5A3A`; 4 marcas `#8C5A3A`):
  - Imagen: `aspect-ratio:4/5`, `overflow:hidden`, fondo `#E0D2B8`, foto `cover`, capa duotono `#8C5A3A` `mix-blend-mode:color; opacity:.55`.
  - Badge opcional arriba‑izquierda, `padding:5px 11px`, 11px `.16em` mayúsculas, texto `#F6E7CE`: "Nuevo" en `#D24A22`, "−20%" en `#8B1E1E`.
  - Cuerpo `padding:16px 18px 20px`, `display:flex; flex-direction:column; gap:9px`: categoría 11px `.2em` mayúsculas `#8C5A3A`; **título 18px/1.25 peso 600** (Bahnschrift); descripción 13px/1.5 `#5C5A4E`; bloque de precio `margin-top:auto; padding-top:12px` con precio 20px peso 600 `#8B1E1E` + sufijo "MXN" 12px `#5C5A4E` o precio anterior 13px `#5C5A4E` `line-through`.
  - Botón "Añadir a la bolsa": ancho completo, `padding:11px 0`, borde `#4B2E20`, transparente, 12px `.18em` mayúsculas; **hover** fondo/borde `#E6B442`.
- **Productos (página 1)**: Botas camperas «Laredo» (Calzado, $4,290, badge Nuevo) · Fieltro 6X «Durango» (Sombrerería, $3,150) · Cinturón labrado «Sierra Alta» (Cintos, $1,180 antes $1,480, badge −20%) · Camisa vaquera «Mezquite» (Camisas, $980) · Chaqueta de gamuza «Bisonte» (Abrigos, $6,740) · Hebilla de latón «Campeón 1892» (Herrajes, $890).
- **Productos (página 2)**: Chaparreras «Coahuila» (Cuero, $5,600) · Guantes de faena «Herradura» (Accesorios, $620) · Espuelas templadas «Vaquero» (Herrajes, $1,340 antes $1,690, badge −20%) · Vaqueros rectos «Cañón 14 oz» (Denim, $1,590) · Paliacate «Polvo Rojo» (Accesorios, $240) · Alforja encerada «Camino Real» (Marroquinería, $2,980, badge Nuevo).
- **Puntos de página**: 2 barras `44×4px`, inactivas `rgba(75,46,32,.28)`, activa `#8B1E1E` y `height:5px`, centradas, `margin-top:44px`.

### 6. Footer
- **Fila de promesas**: `grid-template-columns:repeat(3,1fr)`, `padding:clamp(20px,2.4vw,30px) clamp(20px,4vw,56px)`, borde inferior `#4B2E20`. Cada ítem: icono 22px `#E6B442` + título 13px `.14em` mayúsculas `#EDE3D2` + nota 12px `#A39884`. Contenido: "Envío en 48 horas / Gratis desde $2,500 en toda la República" · "Garantía de taller / Dos años en costuras y herrajes" · "Cambios sin costo / 30 días para dar con tu talla".
- **Fila principal**: `grid-template-columns:minmax(0,1.4fr) repeat(3,minmax(0,.9fr))`, `gap:clamp(24px,3vw,52px)`, `padding:clamp(40px,4.6vw,64px) clamp(20px,4vw,56px)`.
  - Col 1: marca **Rye 24px** `#E6B442` "Rincón del Oeste" + "EST. 1892 · SALTILLO" 10px `.42em` `#A39884`; párrafo 14px/1.65 `#A39884` `max-width:34ch`; newsletter (input `height:42px`, borde `#4B2E20`, fondo `rgba(75,46,32,.28)` + botón `#E6B442`, **hover** `#D24A22`); nota 11px `#A39884`.
  - Cols 2‑4 ("Tienda", "Ayuda", "La casa"): título 12px `.22em` mayúsculas `#C7A06A`, `margin-bottom:18px`; enlaces 14px `#EDE3D2` en columna con `gap:11px`, **hover** `#E6B442`; "Rebajas de temporada" en `#D24A22`.
- **Barra legal**: borde superior `#4B2E20`, `padding:22px clamp(20px,4vw,56px)`, flex con `justify-content:space-between`: © 2026 Rincón del Oeste · Saltillo, Coahuila (12px `#A39884`) · medios de pago (11px `.18em` mayúsculas `#A39884`: Visa, Mastercard, Amex, Oxxo, 3 MSI) · 3 iconos sociales 34×34 con borde `#4B2E20`, icono `#C7A06A`, **hover** `border-color:#E6B442`.

### Blueprint frame (patrón transversal del design system)
Todo marco (placa del hero, placa de marcas, tarjetas de producto) es un objeto de dibujo técnico: esquinas **cuadradas** (`border-radius:0`), borde de 1px, **sin relleno**, y cuatro marcas de registro "+" en las esquinas:

```css
.frame { position: relative; border: 1px solid <color>; border-radius: 0; }
.frame > .corner { position: absolute; width: 11px; height: 11px; color: <mark-color>; }
.frame > .corner::before { content:""; position:absolute; left:5px; top:0; width:1px; height:100%; background:currentColor; }
.frame > .corner::after  { content:""; position:absolute; top:5px; left:0; width:100%; height:1px; background:currentColor; }
.frame > .corner.tl { top:-6px; left:-6px }  .frame > .corner.tr { top:-6px; right:-6px }
.frame > .corner.bl { bottom:-6px; left:-6px } .frame > .corner.br { bottom:-6px; right:-6px }
```
Las marcas sobresalen 6px, así que cualquier contenedor necesita ese aire (de ahí el `margin:0 -8px; padding:0 8px` del track del catálogo y los `gap` ≥ 22px de la grilla). Nunca redondear ni omitir las marcas.

## Interactions & Behavior

### Carruseles — loop continuo hacia la derecha (hero y catálogo)
Comportamiento clave (fue un pedido explícito): **nunca rebobinar**. Al pasar del último panel al primero el movimiento continúa en la misma dirección. El panel entrante llega **desde la izquierda** y el contenido viaja **hacia la derecha**.

Técnica del prototipo (rotación de hijos, sin clones):
- **Avanzar** (`dir > 0`): `transition:none` → `track.insertBefore(track.lastElementChild, track.firstElementChild)` → `transform:translateX(-100%)` → forzar reflow → `transition:transform 800ms cubic-bezier(.55,.05,.25,1)` → `transform:translateX(0%)`.
- **Retroceder** (`dir < 0`): animar a `translateX(-100%)`; al terminar, `transition:none`, `track.appendChild(track.firstElementChild)`, `transform:translateX(0%)`.
- **Orden inicial del hero**: los slides se escriben 1,2,3 y al montar se reordena a **1,3,2** (`track.appendChild(track.children[1])`) para que la rotación muestre 1→2→3→1. El catálogo (2 páginas) no requiere reordenar.
- Bandera `busy` por carrusel para ignorar clics durante los 800ms de transición.
- **Autoplay** solo en el hero: `setTimeout` reprogramado en cada update; por defecto 6500ms; **pausa** con `mouseenter` y reanuda con `mouseleave` en la sección del hero.
- **Puntos**: un clic salta panel por panel en la misma dirección (encadena pasos cada `duración + 60ms`).
- Índice lógico separado del DOM (`hero`, `page`) para pintar puntos y contador.

En un framework declarativo el equivalente correcto es un track con panel duplicado (clon del primero) o una librería con `loop:true` + `direction` invertida; lo importante es conservar: 800ms `cubic-bezier(.55,.05,.25,1)`, dirección única, sin salto de rebobinado, autoplay pausable y puntos sincronizados.

### Otros
- Enlaces internos: navbar y CTAs apuntan a `#catalogo`; el hero 3 y el footer a `#marcas`.
- Todos los estados hover están documentados por componente arriba; foco de teclado: `outline: 2px solid #E6B442; outline-offset: 2px` (no dejar el anillo azul del navegador).
- `::selection`: `rgba(230,180,66,.35)`.
- Sin estados de carga/error en este diseño (catálogo estático). Si el catálogo se vuelve dinámico, mantener 6 tarjetas por página y `aspect-ratio:4/5` para evitar reflow.
- Responsive: el prototipo es fluido por `clamp()` a partir de ~900px. **Pendiente de diseño para móvil**: navbar (menú hamburguesa + buscador icono), grilla del catálogo (2 o 1 columna), altura del hero y footer a 1‑2 columnas.

## State Management
- `hero: number` (0‑2) — panel visible del hero; cambia por flechas, puntos y autoplay.
- `page: number` (0‑1) — página visible del catálogo; cambia por flechas y puntos.
- `paused: boolean` (no reactivo) — autoplay en pausa por hover.
- `busy: { hero, cat }` (no reactivo) — bloqueo durante la transición.
- Props/ajustes expuestos en el prototipo: `autoplay` (bool, true), `autoplayMs` (3000‑12000, 6500), `photoTint` ("Cuero" `#8C5A3A` | "Óxido" `#D24A22` | "Ocre" `#C7A06A` | "Sin tinte"), `showSaleTags` (bool, true).
- Sin fetching. En producción: catálogo desde API/CMS; contador de bolsa desde el estado del carrito.

## Design Tokens

**Colores (paleta western sobre la estructura del design system Industry)**
| Rol | Hex |
| --- | --- |
| Fondo base / oscuro | `#1E1B17` |
| Panel oscuro (marcas) | `#26221C` |
| Borde sobre oscuro | `#4B2E20` |
| Fondo papel (catálogo) | `#EDE3D2` |
| Marco de imagen en papel | `#E0D2B8` |
| Acento primario (oro) | `#E6B442` |
| Acento secundario (óxido) | `#D24A22` |
| Rojo granero (avisos, precios, badges) | `#8B1E1E` |
| Cuero (duotono, bordes, kickers) | `#8C5A3A` |
| Ante / marcas de registro | `#C7A06A` |
| Texto sobre oscuro | `#EDE3D2` |
| Texto secundario sobre oscuro | `#A39884` (5.56:1) |
| Texto secundario sobre papel | `#5C5A4E` (5.46:1) |
| Párrafo hero | `#C7BBA4` |
| Texto sobre acento | `#1E1B17` / `#F6E7CE` |

Accesibilidad: **no** usar el verde salvia `#6D7266` para texto pequeño (3.4‑3.9:1, falla AA); se reemplazó por `#5C5A4E` en papel y `#A39884` en oscuro. Mantener ese criterio.

**Tipografía**
- Display (h1, h2, marca, wordmarks de talleres): **Rye** 400 (Google Fonts) — `font-family:'Rye',serif`.
- Interfaz y texto menor: **Bahnschrift** con respaldo — `Bahnschrift, "Bahnschrift SemiCondensed", "DIN Alternate", "Barlow Semi Condensed", sans-serif` (se carga Barlow Semi Condensed 400/500/600/700 de Google para no‑Windows).
- Escala: h1 `clamp(38px,4.6vw,68px)`/1.06 · h2 sección `clamp(28px,3vw,44px)`/1.08 · h2 menor `clamp(26px,2.6vw,38px)`/1.1 · título de tarjeta 18px/1.25 peso 600 · cuerpo 14‑16px/1.5‑1.65 · descripción 13px/1.5 · kicker 12px `.24em` · etiqueta 11px `.2em` · micro 10px `.36‑.42em`.
- Regla: mayúsculas + tracking amplio para kickers, etiquetas, botones y navegación; Rye siempre en caja normal (nunca mayúsculas).

**Espaciado y forma**
- Gutter de sección: `clamp(20px,4vw,56px)`; ancho máximo de contenido `1360px`.
- Padding vertical de sección: `clamp(40px,5vw,66px)` (marcas) / `clamp(52px,6vw,86px)` (catálogo).
- Gaps: grilla catálogo `clamp(22px,2.4vw,36px)`; footer `clamp(24px,3vw,52px)`; navbar `clamp(14px,2.2vw,40px)`.
- **Radio: 0 en todo** (regla del design system). Sin sombras: la jerarquía se construye con bordes de 1px y marcas de registro.
- Alturas fijas: navbar 78px · controles 38‑46px · celda de marca 104px · imagen de producto `aspect-ratio:4/5`.
- Transiciones: 800ms `cubic-bezier(.55,.05,.25,1)` en los tracks; el resto de hovers son cambios de color instantáneos.

## Assets
- **Fotografías: pendientes.** El prototipo usa 15 placeholders (`<image-slot>`): `rb-hero-1..3` (hero) y `rb-p01..p12` (productos). Sustituir por imágenes reales: hero apaisado (mín. 1920px de ancho), producto vertical 4:5 (mín. 1000×1250). Todas las fotos pasan por el duotono (`mix-blend-mode:color` sobre `#8C5A3A`; `opacity:.55` en producto, 100% en hero) — es parte de la identidad, no un efecto decorativo.
- **Iconos**: Lucide, `stroke-width:1.5` (search, user, shopping-bag, chevron-left/right, arrow-right, truck, shield, refresh-cw, instagram, youtube, whatsapp/message). Usar el paquete de iconos del codebase si ya existe, manteniendo el trazo 1.5.
- **Fuentes**: Rye y Barlow Semi Condensed desde Google Fonts; Bahnschrift es fuente de sistema en Windows.
- Marcas, productos, precios y nombres de talleres son **ficticios** (contenido de muestra).

## Files
- `Home Rincon del Oeste.dc.html` — el prototipo completo (markup + lógica de los carruseles). Ábrelo en el navegador para ver el comportamiento real.
- `industry-tokens.css` — hoja del design system **Industry** que el prototipo carga; de aquí vienen las clases estructurales `.blueprint` / `.corner` y la retícula. Los colores y fuentes de esta hoja **están sobreescritos** por la paleta western y Rye/Bahnschrift descritas arriba.
- `image-slot.js` — componente placeholder de imágenes del entorno de diseño; **no llevar a producción**.
