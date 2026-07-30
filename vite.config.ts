import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Del opp leverandørkoden. Uten dette havner React, Supabase,
          // motion og lucide i én fil på 800+ kB som må lastes ferdig før
          // noe vises — og som må lastes helt på nytt ved hver utgivelse,
          // selv om bare vår egen kode endret seg.
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('/motion') || id.includes('framer-motion')) return 'motion';
            if (id.includes('lucide-react')) return 'ikoner';
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
              return 'react';
            }
            return 'vendor';
          },
        },
      },
      // Varsler oss hvis en enkeltdel vokser forbi det som er forsvarlig
      // på mobil. Tallet er en grense å reagere på, ikke en fasit.
      chunkSizeWarningLimit: 300,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
