// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true
    },
    preview: {
      allowedHosts: true
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          const isKnownAstroInternalWarning =
            warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            warning.message?.includes('@astrojs/internal-helpers/remote') &&
            warning.message?.includes('matchHostname') &&
            warning.message?.includes('matchPathname') &&
            warning.message?.includes('matchPort') &&
            warning.message?.includes('matchProtocol');

          if (isKnownAstroInternalWarning) {
            return;
          }

          warn(warning);
        }
      }
    }
  },

  integrations: [icon()]
});