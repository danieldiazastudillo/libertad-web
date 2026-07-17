import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://danieldiazastudillo.github.io",
  base: "/libertad-web",
  integrations: [react()],
});
