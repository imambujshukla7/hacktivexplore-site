import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://astros.zank.studio",
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`
    }
  },
  integrations: [tailwind(), alpinejs(), svelte()]
});