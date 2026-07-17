# Sistema de diseño

Este sitio implementa el sistema de diseño oficial de la Resp∴ Log∴ Abnegación N°48: una
marca ceremonial y formal (no una marca de producto/app), pensada para transmitir solemnidad.
Los tokens viven en `src/styles/tokens/` como variables CSS (`:root`) y se usan tanto desde los
componentes `.astro` como desde los pocos estilos inline que quedan en las páginas.

## Paleta de colores (`tokens/colors.css`)

Derivada del sello de la logia y de la invitación del aniversario 2020. Es una paleta
deliberadamente angosta y sobria — ceremonial, no decorativa.

- **Navy** (`--navy-950` a `--navy-50`): color base de los campos/fondos. `--navy-950` es el
  fondo principal del sitio (`--surface-canvas-dark`).
- **Gold** (`--gold-900` a `--gold-100`): acento ceremonial. **Se usa con moderación** — nunca
  como relleno de botones, solo como borde/hairline, texto de acento o divisores.
- **Ivory/Parchment** (`--ivory-100` a `--ivory-400`): superficies claras, pensadas para
  impresión (la invitación imprimible en `/invitacion`) y no para el sitio principal.
- **Ink** (`--ink-900/700/500`): texto sobre superficies claras/impresión — nunca negro puro.
- **Gray** (`--gray-900` a `--gray-100`): chrome de UI, nunca para copy ceremonial.

Los tokens semánticos (`--surface-*`, `--text-*`, `--action-*`, `--border-*`) son los que
deberían usarse en componentes nuevos en vez de los colores base directamente.

## Tipografía (`tokens/typography.css`)

- **Cinzel** — display/títulos. Fuente provista por la logia, autohospedada en
  `src/assets/fonts/`. Pesos 400–900.
- **EB Garamond** — cuerpo de texto. Es un reemplazo de código abierto vía CDN de Google
  Fonts (comentario en el propio archivo: "flag stands until the lodge supplies its own body
  face") — si la logia entrega su propia tipografía de cuerpo, reemplazar aquí.
- **Courier Prime** — monoespaciada, autohospedada. Uso puntual (no se usa activamente en las
  páginas actuales, pero está disponible como token `--font-mono`).
- Tracking amplio (`--tracking-wide/wider/widest`) es una firma deliberada de la marca — el
  texto ceremonial (eyebrows, headings, botones) suele ir en mayúsculas con letter-spacing
  ancho.
- Los roles semánticos (`--font-eyebrow`, `--font-display-hero`, `--font-body`, etc.) combinan
  peso/tamaño/line-height/familia en una sola variable `font` shorthand — úsalos en vez de
  componer `font-family` + `font-size` + `line-height` por separado.

## Espaciado, radio y movimiento (`tokens/spacing.css`)

- Escala de espaciado `--space-1` (4px) a `--space-10` (128px), generosa — la marca privilegia
  el espacio en blanco.
- Radios casi cuadrados: `--radius-sm` (2px) a `--radius-lg` (6px). **No hay botones tipo
  "pill"** ni esquinas muy redondeadas — es una marca formal, no una app.
- Sombras mínimas: `--shadow-card` es casi imperceptible; los paneles se distinguen por
  hairlines de borde (`--border-on-dark`, `--border-gold`), no por elevación tipo Material.
  `--shadow-panel`/`--shadow-seal` son las únicas sombras con algo de presencia, reservadas
  para el sello y overlays.
- Movimiento lento y deliberado: `--duration-fast` (150ms) a `--duration-slow` (480ms) con
  `--ease-standard`. Nada de rebote ("bounce") ni easing juguetón.

## Componentes (`src/components/`)

Todos los primitivos presentacionales son componentes **`.astro`** con `<style>` con scope —
sin JavaScript en tiempo de ejecución. La única pieza interactiva del sitio es el formulario de
RSVP, implementado en React.

| Componente | Archivo | Notas |
|---|---|---|
| `Seal` | `brand/Seal.astro` | Usa `<Image>` de `astro:assets` para optimizar el sello en build. Prop `glow` agrega el anillo dorado (solo para hero/portada). |
| `Badge` | `core/Badge.astro` | Tonos `gold` \| `navy` \| `outline`. `gold` para uso ceremonial en fondo oscuro, `navy` para superficies claras/impresión, `outline` para etiquetas subordinadas. |
| `Card` | `core/Card.astro` | Panel plano, sin sombra real — el borde hairline lleva el peso visual. Tonos `dark` \| `light`. |
| `Divider` | `core/Divider.astro` | Línea dorada con motivo degradado; con `label` centra un texto (p. ej. "Confirmar Asistencia"). |
| `Eyebrow` | `core/Eyebrow.astro` | El "kicker" en mayúsculas que antecede a cada título de sección. |
| `Button` | `core/Button.astro` | Variantes `primary` \| `secondary` \| `ghost`. **Nunca dorado sólido** — dorado es acento, no relleno. Hover/focus resuelto en CSS puro (`:hover`, `:focus-visible`), no con JS. |
| `Input` / `RsvpForm` | `forms/Input.tsx`, `forms/RsvpForm.tsx` | Únicos componentes React (islas). `Input` es de estilo subrayado (underline), no recuadrado — coherente con la formalidad plana de la marca. |

Al crear un componente nuevo: por defecto usar `.astro` + `<style>` con scope. Solo pasar a
React si el componente necesita estado o manejadores de eventos en el cliente (ver
`CLAUDE.md`, sección de arquitectura).
