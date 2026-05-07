import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * VITE CONFIG — Fauzi Kaca Mobil
 *
 * Multi-page setup: setiap HTML di root = entry point terpisah.
 * Tailwind & PostCSS auto-handled via postcss.config.js.
 *
 * Build output → dist/ folder, siap upload ke Domainesia / static host manapun.
 */
export default defineConfig({
  // Root tetap di project root, HTML files di root juga
  root: '.',

  // Path public assets — disalin ke dist/ saat build (untuk partials, .htaccess, dll)
  publicDir: 'public',

  // Base URL — gunakan '/' untuk root domain, atau '/subfolder/' jika di subdomain
  base: '/',

  // Server config untuk dev
  server: {
    port: 3000,
    open: true,        // auto-open browser saat npm run dev
    host: true,        // izinkan akses dari LAN (tes via HP)
    strictPort: false,
  },

  // Preview config (untuk npm run preview setelah build)
  preview: {
    port: 4173,
    open: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,            // matikan untuk production (hide source code)
    minify: 'esbuild',           // esbuild = default Vite, lebih cepat dari terser
    cssMinify: true,

    // Asset hashing untuk cache busting
    assetsDir: 'assets',
    assetsInlineLimit: 4096,      // assets < 4KB → inline base64

    // Multi-page entry points
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        about:       resolve(__dirname, 'about.html'),
        services:    resolve(__dirname, 'services.html'),
        howItWorks:  resolve(__dirname, 'how-it-works.html'),
        portfolio:   resolve(__dirname, 'portfolio.html'),
        faq:         resolve(__dirname, 'faq.html'),
        contact:     resolve(__dirname, 'contact.html'),
      },
      output: {
        // Naming convention untuk asset bundle
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop() || '';
          if (/png|jpe?g|svg|gif|webp|ico/i.test(ext)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },

    // esbuild minify options (drop console.log di production)
    // Untuk drop console.log, set di environment-specific build
  },

  // CSS handling
  css: {
    devSourcemap: true,
  },

  // Resolve alias — bisa pakai '@' sebagai shortcut ke src/
  resolve: {
    alias: {
      '@':       resolve(__dirname, 'src'),
      '@js':     resolve(__dirname, 'src/js'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
});
