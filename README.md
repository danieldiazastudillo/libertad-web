# Sitio web — 110° Aniversario, Resp∴ Log∴ Abnegación N°48

Sitio conmemorativo del centésimo décimo aniversario de la Respetable Logia Abnegación N°48
(Viña del Mar, Chile), implementado a partir del sistema de diseño oficial de la logia.

## Stack

- [Astro](https://astro.build/) + React (islas) + TypeScript
- Rutas por archivo: `/` y `/invitacion`
- Content Collections de Astro para los textos y el calendario de eventos (ver `CONTENIDO.md`)
- CSS con tokens de diseño (colores, tipografía, espaciado) importados del sistema de diseño
- Imágenes optimizadas automáticamente en el build (`astro:assets`, formato WebP)
- Publicación automática en GitHub Pages vía GitHub Actions

## ¿Cómo edito los textos o el calendario de eventos?

Ver **[CONTENIDO.md](./CONTENIDO.md)** — una guía en español pensada para editar el sitio sin tocar código.

## Estructura

- `src/content/` — datos del sitio: `events/events.yaml` (calendario), `site.yaml` (textos cortos), `historia/historia.md` (historia en Markdown)
- `src/content.config.ts` — esquema de las colecciones de contenido anteriores
- `src/styles/tokens/` — tokens de color, tipografía y espaciado del sistema de diseño
- `src/components/` — componentes de UI del sistema de diseño (`Seal`, `Badge`, `Card`, `Divider`, `Eyebrow`, `Button` como componentes `.astro`; `Input`/`RsvpForm` como isla de React interactiva)
- `src/pages/index.astro` — página principal (nav, hero, cronograma, historia, RSVP)
- `src/pages/invitacion/index.astro` — invitación imprimible (`/invitacion`)
- `src/assets/fonts/` — tipografías Cinzel y Courier Prime (autohospedadas)
- `src/assets/images/` — sello de la logia, fotografías de fondo y motivo de wireframe arquitectónico (fuente para las versiones optimizadas que genera el build)
- `.github/workflows/deploy.yml` — build y despliegue automático a GitHub Pages

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
