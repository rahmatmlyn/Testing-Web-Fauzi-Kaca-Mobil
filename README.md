# 🚗 Fauzi Kaca Mobil — Website

Website company profile untuk **Fauzi Kaca Mobil** — bengkel spesialis kaca mobil di Jabodetabek. Built with **Vite + Tailwind CSS** (vanilla JavaScript, no framework). Static output siap di-deploy ke Domainesia.

[![Deploy](https://github.com/USERNAME/fauzi-kaca-mobil/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/fauzi-kaca-mobil/actions/workflows/deploy.yml)
[![CI](https://github.com/USERNAME/fauzi-kaca-mobil/actions/workflows/ci.yml/badge.svg)](https://github.com/USERNAME/fauzi-kaca-mobil/actions/workflows/ci.yml)

> 🌐 **Live**: [https://fauzikacamobil.com](https://fauzikacamobil.com)

---

## 📋 Tech Stack

| Tool | Fungsi |
|------|--------|
| **[Vite](https://vitejs.dev/)** | Build tool & dev server (HMR super cepat) |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework |
| **Vanilla JS (ES Modules)** | No framework — code yang ringan & cepat |
| **PostCSS + Autoprefixer** | CSS preprocessing |
| **Prettier + ESLint** | Code formatting & linting |
| **GitHub Actions** | CI/CD auto-deploy |

---

## 🚀 Quick Start

### Prasyarat
- **Node.js** v18 atau lebih baru ([download](https://nodejs.org/))
- **npm** v9+ (sudah include di Node.js)
- Code editor — rekomendasi **VS Code** (auto-install extensions yang dibutuhkan)

### Setup Lokal

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/fauzi-kaca-mobil.git
cd fauzi-kaca-mobil

# 2. Install dependencies
npm install

# 3. Copy env example
cp .env.example .env
# Edit .env dengan nilai asli (opsional — default values bekerja)

# 4. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) — auto-reload setiap kali Anda save file. ✨

---

## 📜 Available Scripts

```bash
npm run dev              # Start dev server (port 3000) dengan HMR
npm run build            # Build production ke folder dist/
npm run preview          # Preview hasil build di port 4173
npm run preview:host     # Preview + expose ke LAN (tes via HP)
npm run clean            # Hapus folder dist/
npm run format           # Auto-format code dengan Prettier
npm run format:check     # Cek format tanpa modifikasi
npm run lint             # Lint JS dengan ESLint
npm run deploy:zip       # Build + zip dist/ untuk manual upload
npm run size             # Cek ukuran build output
```

---

## 📁 Struktur Folder

```
fauzi-kaca-mobil/
│
├── 📄 *.html                       Halaman website (ENTRY POINTS)
│   ├── index.html                  Homepage
│   ├── about.html                  Tentang
│   ├── services.html               Layanan
│   ├── how-it-works.html           Cara kerja
│   ├── portfolio.html              Galeri
│   ├── faq.html                    FAQ
│   └── contact.html                Kontak
│
├── 📁 src/                         SOURCE CODE
│   ├── styles/
│   │   └── main.css                Tailwind directives + custom CSS
│   └── js/
│       ├── main.js                 Entry point JS
│       ├── config.js               ⭐ KONFIGURASI (WA, alamat, dll)
│       ├── components/             7 komponen UI modular
│       ├── data/                   Data services, testimoni, FAQ
│       └── utils/                  Helper functions
│
├── 📁 public/                      STATIC FILES (di-copy as-is ke build)
│   ├── partials/
│   │   ├── header.html             Header (auto-include via JS)
│   │   └── footer.html             Footer (auto-include via JS)
│   ├── assets/img/                 Folder untuk gambar
│   ├── api/                        PHP backend opsional
│   ├── 404.html                    Halaman error
│   ├── .htaccess                   Konfigurasi Apache (Domainesia)
│   ├── robots.txt                  SEO crawler rules
│   ├── sitemap.xml                 SEO sitemap
│   └── site.webmanifest            PWA manifest
│
├── 📁 .github/
│   ├── workflows/
│   │   ├── deploy.yml              Auto-deploy ke Domainesia
│   │   └── ci.yml                  Lint & build check pada PR
│   ├── ISSUE_TEMPLATE/             Template bug & feature request
│   └── PULL_REQUEST_TEMPLATE.md
│
├── 📁 docs/                        Dokumentasi
│
├── 🔧 vite.config.js               Vite config (multi-page setup)
├── 🔧 tailwind.config.js           Tailwind theme & content paths
├── 🔧 postcss.config.js            PostCSS plugins
├── 🔧 .eslintrc.json               ESLint rules
├── 🔧 .prettierrc.json             Prettier rules
├── 🔧 .env.example                 Template env vars
├── 🔧 .nvmrc                       Pin Node version
└── 📦 package.json                 Dependencies & scripts
```

---

## ✏️ Cara Update Konten

### 🔵 Ganti nomor WhatsApp / info kontak
Edit **`src/js/config.js`** — semua info brand dipusatkan di sini.

```js
contact: {
  phone: '+62 813-XXXX-XXXX',
  whatsapp: '628139999XXXX',     // ← edit ini
  email: 'info@bisnisanda.com',
  ...
}
```
Setelah save, info otomatis update di seluruh website (header, footer, semua tombol WA).

### 🔵 Tambah/edit layanan
Edit **`src/js/data/services.js`** — tambah object baru ke array `SERVICES`.

### 🔵 Tambah testimoni
Edit **`src/js/data/testimonials.js`** — auto-render di slider homepage.

### 🔵 Edit FAQ
Edit **`src/js/data/faq.js`** — auto-render di accordion FAQ.

### 🔵 Edit teks/copy halaman
Edit langsung file `*.html` di root.

### 🔵 Ganti gambar
Tempatkan gambar di **`public/assets/img/<folder>/`** sesuai kategorinya.

---

## 🔄 Workflow Git Recommended

### Saat update konten ringan
```bash
git checkout -b update/contact-info
# ...edit files...
git add .
git commit -m "update: ganti nomor WhatsApp"
git push origin update/contact-info
# Buat Pull Request di GitHub → review → merge ke main
# GitHub Actions auto-deploy 🚀
```

### Saat develop fitur baru
```bash
git checkout -b feature/blog-page
# ...develop...
npm run dev    # tes lokal
npm run build  # tes build
git commit -am "feat: tambah halaman blog"
git push origin feature/blog-page
```

### Saat butuh deploy manual (skip GitHub Actions)
```bash
npm run deploy:zip
# File fauzi-kaca-mobil-build.zip muncul → upload manual via cPanel
```

---

## 🚀 Deployment

### Opsi 1: Auto-deploy via GitHub Actions (RECOMMENDED)

**Setup awal (sekali saja):**

1. Push repository ke GitHub
2. Buka **Settings → Secrets and variables → Actions**
3. Tambahkan 4 secrets ini:

| Secret Name | Value |
|---|---|
| `FTP_HOST` | `ftp.domainanda.com` (dari cPanel Domainesia) |
| `FTP_USERNAME` | Username cPanel Anda |
| `FTP_PASSWORD` | Password cPanel Anda |
| `FTP_REMOTE_PATH` | `/public_html/` |

4. Setelah secrets disimpan, **setiap push ke `main` → auto-deploy** ke Domainesia 🚀
5. Pantau progress di tab **Actions** GitHub.

### Opsi 2: Manual upload

```bash
# Build di komputer lokal
npm run build

# Folder dist/ berisi semua file siap upload
# Upload ke /public_html/ via:
# - cPanel File Manager (drag & drop folder dist/*)
# - FTP client (FileZilla, dll)
```

---

## 📊 Monitoring & Analytics

Setelah website live, monitor performa via:

### Built-in GitHub
- **Actions tab** → riwayat deploy (sukses/gagal)
- **Insights tab** → contributor activity, code frequency
- **Issues** → bug tracking, feature requests

### Recommended External Tools

| Tool | Fungsi | Free Tier |
|------|--------|-----------|
| [Google Analytics 4](https://analytics.google.com/) | Traffic, behavior | ✅ Gratis |
| [Google Search Console](https://search.google.com/search-console) | SEO, indexing | ✅ Gratis |
| [PageSpeed Insights](https://pagespeed.web.dev/) | Performance audit | ✅ Gratis |
| [UptimeRobot](https://uptimerobot.com/) | Uptime monitoring | ✅ 50 monitor gratis |
| [Sentry](https://sentry.io/) | Error tracking | ✅ 5K events/bulan |
| [Hotjar](https://www.hotjar.com/) | Heatmap, recording | ✅ 1.05K sesi/bulan |

### Setup Google Analytics (cepat)
1. Daftar GA4 → dapat Measurement ID `G-XXXXXXXXXX`
2. Edit `.env` (lokal) atau GitHub Secret: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Tambahkan tag GA4 di `index.html` `<head>` (atau buat komponen baru di `src/js/components/analytics.js`)

---

## 🎨 Customisasi Theme

### Ganti warna brand
Edit **`tailwind.config.js`**:

```js
colors: {
  navy:   { 700: '#YOURCOLOR', 800: '#YOURCOLOR', 900: '#YOURCOLOR' },
  accent: { 400: '#YOURCOLOR', 500: '#YOURCOLOR', 600: '#YOURCOLOR' },
}
```

Setelah save, run `npm run dev` — warna otomatis update di seluruh website.

### Ganti font
Edit **`tailwind.config.js`** & **`src/styles/main.css`** — sesuaikan font family. Update juga `<link>` Google Fonts di setiap HTML.

---

## 🛠️ Troubleshooting

### `npm install` error
- Pastikan Node.js v18+ (`node --version`)
- Hapus `node_modules/` & `package-lock.json`, lalu `npm install` ulang

### Header & Footer tidak muncul saat dev
- Vite dev server harus jalan (`npm run dev`)
- Browser blocking jika file di-open langsung dari folder

### Build error: "Cannot find module"
- Cek import paths di JS files
- Pastikan file yang di-import benar-benar ada

### GitHub Actions deploy gagal
- Cek tab **Actions** → klik run yang gagal → baca log
- Pastikan 4 FTP secrets sudah di-set dengan benar
- Cek bahwa FTP credentials masih valid (kadang Domainesia rotate password)

### Tailwind class tidak apply setelah build
- Pastikan class yang dipakai ter-scan di `tailwind.config.js` `content` array
- Untuk class dinamis di JS, tambah ke `safelist` di config

---

## 🤝 Contributing

1. Fork repository
2. Create branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'feat: add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

Mengikuti **[Conventional Commits](https://www.conventionalcommits.org/)**:
- `feat:` fitur baru
- `fix:` bug fix
- `docs:` perubahan dokumentasi
- `style:` formatting, no logic change
- `refactor:` refactoring code
- `chore:` maintenance

---

## 📄 License

Proprietary — © 2026 Fauzi Kaca Mobil. All rights reserved.

---

## 📞 Support

Pertanyaan teknis? Buka **[Issue baru](../../issues/new/choose)** atau hubungi developer.
