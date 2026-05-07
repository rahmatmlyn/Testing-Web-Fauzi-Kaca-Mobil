/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind akan scan file-file ini untuk mendeteksi class yang dipakai
  content: [
    './*.html',                  // root HTML pages (index.html, about.html, dll)
    './public/**/*.html',        // partials di public/
    './src/**/*.{js,html}',      // semua JS yang generate class dinamis
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          700: '#1A3870',
          800: '#0F2A5C',
          900: '#0A1F44',
        },
        accent: {
          400: '#FF8533',
          500: '#FF6B1A',
          600: '#E85D0E',
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.85' },
        },
      },
    },
  },

  plugins: [
    // Plugin untuk styling form yang lebih konsisten
    // require('@tailwindcss/forms'),
    // Plugin untuk styling content prose (artikel)
    // require('@tailwindcss/typography'),
  ],

  // Safelist — class yang digenerate dinamis di JS (tidak ke-detect oleh content scan)
  safelist: [
    // Contoh class dinamis dari testimonial-slider.js, dll
    {
      pattern: /(bg|text|border)-(red|orange|green|blue|purple|emerald|yellow)-(50|100|500|700)/,
    },
  ],
};
