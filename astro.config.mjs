import { defineConfig } from 'astro/config';
/** @type {import("prettier").Config} */

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  srcDir: './src',
   vite: {
    build: {
        cssMinify: 'lightningcss',
    },
    css: {
        transformer: 'lightningcss',
        minify: true,
        lightningcss: {
            browserslist: '>= 0.25%',
            drafts: {
                nesting: true,
                customMedia: true,
            },
            cssModules: true,
        },
    },
}
});