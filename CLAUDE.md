# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev       # astro dev — local dev server
npm run build     # astro check && astro build — type-check then static build to dist/
npm run preview   # serve the built dist/ output locally
```

There is no test suite and no linter configured. `npm run build` (via `astro check`) is the
only automated correctness gate — always run it after touching `.astro` files, `src/content.config.ts`,
or anything under `src/content/`, since content schema errors and template type errors only surface there.

## Architecture

This is an Astro (v7, static output) site with React used only for the one interactive
island. It replaced an earlier Vite+React SPA; that history doesn't exist in git (repo was
initialized fresh partway through the project), so don't go looking for it.

**Content is data-driven, not hardcoded in pages.** `src/content.config.ts` defines three
collections consumed by `src/pages/index.astro` and `src/pages/invitacion/index.astro`:
- `events` (`src/content/events/events.yaml`, `file()` loader) — the events calendar. Each
  entry has an explicit numeric `order` field — **required** because Astro's content-layer
  store does not preserve YAML array order; without it, `getCollection("events")` returns
  entries sorted by `id` instead of file order. Sort by `data.order`, not array position.
- `site` (`src/content/site.yaml`, `file()` loader, no schema) — every short copy block on
  the site (hero, agenda, lodges, rsvp, footer, nav, invitacion). Each top-level YAML key is
  a separate collection entry, fetched individually via `getEntry("site", "hero")` etc.
- `historia` (`src/content/historia/*.md`, `glob()` loader) — long-form prose, rendered via
  `const { Content } = await render(entry)`.

`CONTENIDO.md` (Spanish) is the non-technical editing guide for these three files — keep it
in sync if you change the schema or add a new collection.

**Component split by interactivity, not by convention.** The design-system primitives (`Seal`,
`Badge`, `Card`, `Divider`, `Eyebrow`, `Button` in `src/components/`) are `.astro` components
with scoped `<style>` — zero client JS. The RSVP form is the *only* stateful UI on the site
(submit → success message), so it's a separate React island (`RsvpForm.tsx` + `Input.tsx`),
hydrated with `client:visible` in `index.astro`. When adding new UI, default to a plain
`.astro` component; only reach for React if it needs client-side state/handlers.

**Base-path (`/libertad-web`) correctness is the main footgun.** This is a GitHub Pages
*project* page (`astro.config.mjs` sets `base: "/libertad-web"`), not a `username.github.io`
user page, so every internal reference must resolve under that subpath:
- All binary assets (fonts, images, the SVG column pattern) live under `src/assets/` and are
  imported as ES modules (never referenced by a literal `/assets/...` or `/fonts/...` string).
  Vite/Astro fingerprints imported assets and auto-prefixes them with `base` — anything put in
  a hypothetical `public/` directory instead would NOT get the prefix and would 404 on Pages.
  There is currently no `public/` directory; keep it that way unless something must be served
  at a fixed literal URL.
- `import.meta.env.BASE_URL` does **not** reliably include a trailing slash (empirically
  `"/libertad-web"` with no trailing slash on this Astro version). `index.astro` strips any
  trailing slash and rebuilds hrefs manually (e.g. `` `${base}/invitacion/` ``) — copy that
  pattern for any new internal link rather than assuming a slash either way.

**Images are optimized via `astro:assets`, not manually.** The hero background is run through
`getImage()` in the page frontmatter (resized + WebP) because it's used as a CSS
`background-image`, not an `<img>`. The historia section photos use the `<Image>` component
directly. Both source images are `loading="eager"` deliberately — `loading="lazy"` on these
below-the-fold images is functionally correct but was switched to eager during development to
avoid ambiguity; revisit only with a real reason.

## Deployment

`.github/workflows/deploy.yml` builds with the official `withastro/action@v6` and deploys with
`actions/deploy-pages@v5`, triggered on push to `main`. Two things had to be true outside of
git for this to work, and would need redoing if the repo were ever recreated:
- The repository must be **public** — GitHub Pages on private repos requires a paid GitHub
  plan, and the deploy job 404s otherwise.
- GitHub Pages must be enabled with `build_type: workflow` (Settings → Pages → source
  "GitHub Actions", or `gh api repos/<owner>/<repo>/pages -X POST -f build_type=workflow`).

Live site: https://danieldiazastudillo.github.io/libertad-web/
