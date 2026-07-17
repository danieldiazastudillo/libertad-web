# Flujo de desarrollo

## Requisitos

- Node.js (probado con v24) y npm.

## Instalación y desarrollo local

```bash
npm install
npm run dev       # http://localhost:4321 — servidor de desarrollo con recarga en caliente
```

## Verificación antes de subir cambios

```bash
npm run build     # astro check (tipos + validación de esquemas de contenido) && astro build
npm run preview   # sirve dist/ tal como quedaría publicado, incluyendo el base path /libertad-web
```

No hay suite de tests ni linter configurado. `npm run build` es el único chequeo automatizado
— falla si hay errores de tipos, o si algún archivo en `src/content/` no cumple el esquema
definido en `src/content.config.ts`. Para cambios visuales, revisar manualmente en el navegador
(`npm run preview`, con la ruta `/libertad-web/` incluida, ya que el sitio usa un base path).

## Editar el contenido del sitio

Ver **[CONTENIDO.md](../CONTENIDO.md)** — la guía para editar el calendario de eventos y los
textos del sitio sin tocar código. Para cambios en el *esquema* de contenido (agregar un campo
nuevo, una colección nueva), editar `src/content.config.ts` y mantener `CONTENIDO.md`
sincronizado.

## Agregar una sección o página nueva

1. Si el contenido es texto/datos, agregarlo a `src/content/site.yaml` (o crear una colección
   nueva en `src/content.config.ts` si es una lista repetible, como `events`).
2. Construir la sección como componente `.astro` reutilizando los primitivos de
   `src/components/` y los tokens de `src/styles/tokens/` — ver `docs/sistema-diseno.md`.
3. Si la sección necesita estado en el cliente, aislarlo en un componente React separado e
   hidratarlo con la directiva `client:*` más restrictiva que tenga sentido (`client:visible`
   para algo bajo el fold, como se hizo con `RsvpForm`).
4. Cualquier imagen o fuente nueva va en `src/assets/` (nunca en un directorio `public/`) e
   importada como módulo, para que el pipeline de Astro la optimice y anteponga el base path
   `/libertad-web` automáticamente.
5. Cualquier link interno nuevo debe construirse a partir de `import.meta.env.BASE_URL`
   (sin asumir si trae o no una barra final — ver el patrón ya usado en `index.astro`).

## Despliegue

Push a `main` dispara `.github/workflows/deploy.yml`, que compila con la acción oficial
`withastro/action` y publica con `actions/deploy-pages`. No requiere pasos manuales adicionales
una vez configurado — el repositorio debe mantenerse **público** (GitHub Pages en repos
privados requiere un plan de pago) y GitHub Pages debe seguir configurado con
"GitHub Actions" como fuente de build (Settings → Pages).

Sitio publicado: https://danieldiazastudillo.github.io/libertad-web/
