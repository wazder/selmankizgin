import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import swup from '@swup/astro';

export default defineConfig({
  site: 'https://selmankizgin.com',
  integrations: [
    solid(),
    swup({
      cache: true,
      preload: true,
      progress: false,
      smoothScrolling: false,
      globalInstance: true,
    }),
  ],
  prefetch: {
    defaultStrategy: 'hover',
  },
  server: { port: 4321 },
});
