import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file, glob } from "astro/loaders";

/**
 * The events calendar shown under "Actividades Conmemorativas".
 * To add an event, add a new block to src/content/events/events.yaml — see CONTENIDO.md.
 */
const events = defineCollection({
  loader: file("src/content/events/events.yaml"),
  schema: z.object({
    order: z.number(),
    day: z.string(),
    month: z.string(),
    title: z.string(),
    info: z.string(),
  }),
});

/**
 * Short structured site copy (hero, agenda, participating lodges, RSVP labels,
 * footer). Each top-level key in site.yaml becomes one entry, e.g. getEntry("site", "hero").
 */
const site = defineCollection({
  loader: file("src/content/site.yaml"),
});

/** Long-form prose sections written as Markdown (currently just "historia"). */
const historia = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/historia" }),
  schema: z.object({
    eyebrow: z.string(),
    heading: z.string(),
  }),
});

export const collections = { events, site, historia };
