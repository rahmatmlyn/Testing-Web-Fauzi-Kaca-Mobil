# 🚀 Deployment Guide — Domainesia

Panduan lengkap untuk deploy website ke hosting Domainesia. Ada 3 metode, pilih yang paling sesuai dengan workflow Anda.

---

## 🎯 Memilih Metode Deployment

| Metode | Setup Awal | Kemudahan Update | Recommended Untuk |
|--------|------------|------------------|-------------------|
| **A. Auto-deploy via GitHub Actions** | Medium (15 menit) | ⭐⭐⭐⭐⭐ Push = deploy | Tim/kolaborasi |
| **B. Manual upload via cPanel** | Mudah | ⭐⭐⭐ Build + upload zip | Solo developer |
| **C. FTP client (FileZilla)** | Mudah | ⭐⭐⭐⭐ Sync folder dist/ | Solo developer |

---

## 🅰️ METODE A: GitHub Actions Auto-Deploy

> **Pro**: Setiap push ke main → auto build & deploy. Tidak perlu touch FTP lagi.

### Step 1: Push Project ke GitHub

```bash
cd fauzi-kaca-mobil
git init
git add .
git commit -m "initial commit"

# Buat repo baru di github.com (private recommended)
git remote add origin https://github.com/USERNAME/fauzi-kaca-mobil.git
git branch -M main
git push -u origin main
```

### Step 2: Dapatkan FTP Credentials dari Domainesia

1. Login ke **cPanel Domainesia** (`https://domainanda.com:2083`)
2. Cari menu **"FTP Accounts"** di section **"Files"**
3. Anda bisa pakai akun cPanel utama, atau buat FTP user baru:
   - **Login**: nama user FTP (cth: `deploy@domainanda.com`)
   - **Password**: generate password kuat
   - **Directory**: `/public_html/`
   - **Quota**: Unlimited
4. Catat info berikut:
   - **FTP Host**: biasanya `ftp.domainanda.com` atau IP server (lihat di "Configure FTP Client")
   - **Username**: FTP user yang baru dibuat
   - **Password**: yang Anda set
   - **Port**: 21 (default FTP)

### Step 3: Setup GitHub Secrets

1. Buka repository di GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Klik **"New repository secret"** untuk masing-masing:

| Secret Name | Value |
|---|---|
| `FTP_HOST` | `ftp.domainanda.com` |
| `FTP_USERNAME` | username FTP dari cPanel |
| `FTP_PASSWORD` | password FTP |
| `FTP_REMOTE_PATH` | `/public_html/` |
| `VITE_SITE_URL` | `https://domainanda.com` |
| `VITE_GA_MEASUREMENT_ID` | (opsional) `G-XXXXXXXXXX` |

### Step 4: Test Deployment

```bash
# Push commit kecil untuk trigger workflow
echo "" >> README.md
git commit -am "test: trigger deployment"
git push origin main
```

Buka tab **Actions** di GitHub — Anda akan lihat workflow "🚀 Deploy to Domainesia" jalan. Tunggu ~2-3 menit. ✅ Sukses = website live!

### Step 5: Setup .htaccess (Sekali saja)

Setelah deploy pertama, file `.htaccess` sudah ter-upload otomatis ke `/public_html/`. Tapi jika ada masalah clean URL, cek manual:

1. cPanel → File Manager → `/public_html/`
2. Pastikan `.htaccess` ada (centang **"Show Hidden Files"** jika tidak terlihat)
3. Edit jika perlu — uncomment baris HTTPS redirect setelah SSL aktif

---

## 🅱️ METODE B: Manual Upload via cPanel

> **Pro**: Tidak perlu setup credentials di GitHub. Cocok untuk update sesekali.

### Step 1: Build di Lokal

```bash
npm run build
# Output: folder dist/ berisi semua file production
```

### Step 2: Compress & Upload

**Opsi B1: Pakai npm script**
```bash
npm run deploy:zip
# Otomatis: build → zip dist/ → file fauzi-kaca-mobil-build.zip
```

**Opsi B2: Manual zip**
```bash
cd dist && zip -r ../deploy.zip . && cd ..
```

### Step 3: Upload via cPanel

1. Login cPanel → **File Manager**
2. Masuk folder **`public_html/`**
3. **HAPUS** file lama (kecuali file yang Anda buat manual seperti `cgi-bin/`)
4. Klik **Upload** → upload file zip
5. Setelah upload, klik kanan zip → **Extract**
6. Pastikan file ter-extract langsung di `public_html/` (bukan dalam subfolder `dist/`)
7. Set permission:
   - Folders: **755**
   - Files: **644**

### Step 4: Cek Hasil

Buka domain Anda di browser. Jika ada masalah:
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Cek browser console untuk error

---

## 🅲️ METODE C: FTP Client (FileZilla)

> **Pro**: Sync folder cepat, tidak perlu zip. Cocok untuk dev yang sering update.

### Step 1: Setup FileZilla

1. Download [FileZilla](https://filezilla-project.org/) (gratis)
2. **File → Site Manager → New site**
3. Isi:
   - Protocol: **FTP** (atau **SFTP** jika tersedia)
   - Host: `ftp.domainanda.com`
   - Port: `21` (FTP) atau `22` (SFTP)
   - Logon Type: **Normal**
   - User: FTP username dari cPanel
   - Password: password FTP

### Step 2: Connect & Sync

1. Klik **Connect**
2. Sisi kiri = lokal, sisi kanan = server
3. Lokal: navigasi ke folder `dist/`
4. Server: navigasi ke `/public_html/`
5. Build dulu: `npm run build` di terminal
6. Drag isi `dist/*` (semua file & subfolder, termasuk hidden `.htaccess`) → drop ke `/public_html/`

> ⚠️ Pastikan **"Show Hidden Files"** aktif di FileZilla (View menu) agar `.htaccess` ikut ter-upload.

---

## 🔒 Setup SSL (HTTPS)

**Wajib dilakukan setelah deploy pertama.**

1. cPanel → **SSL/TLS Status**
2. Pilih domain Anda → klik **"Run AutoSSL"**
3. Tunggu 5-15 menit hingga sertifikat aktif
4. Cek dengan buka `https://domainanda.com` — harusnya ada gembok hijau di address bar
5. **Aktifkan force HTTPS**: edit `/public_html/.htaccess`, uncomment baris ini:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## 🔧 Konfigurasi Tambahan

### Setup Custom Email (info@domainanda.com)

1. cPanel → **Email Accounts**
2. Klik **Create**
3. Isi: `info@domainanda.com`, set password
4. Akses email via:
   - cPanel → **Webmail** (Roundcube/Horde)
   - Atau setup di Gmail/Outlook dengan IMAP/POP3

### Setup Subdomain (cth: `blog.domainanda.com`)

1. cPanel → **Subdomains**
2. Subdomain: `blog`
3. Document Root: `/public_html/blog/`
4. Klik **Create**

### Backup Otomatis (Highly Recommended)

cPanel → **Backup** → **Download a Full Account Backup**

Atau setup auto-backup:
- Domainesia menyediakan auto-backup di paket tertentu (cek dashboard)
- Atau pakai script eksternal seperti UpdraftPlus (untuk WordPress) — untuk static site, **GitHub IS your backup**

---

## 🐛 Troubleshooting

### "404 Not Found" saat akses /about
**Penyebab**: `.htaccess` tidak ter-upload atau `mod_rewrite` tidak aktif.

**Solusi**:
1. Cek apakah `.htaccess` ada di `/public_html/` (show hidden files)
2. cPanel → **Apache Modules** → pastikan `mod_rewrite` aktif
3. Jika masih bermasalah, edit URL di nav menu untuk pakai `/about.html` (dengan ekstensi)

### Tombol WhatsApp link salah
**Penyebab**: Belum edit `src/js/config.js` dengan nomor asli.

**Solusi**:
```bash
# Edit src/js/config.js, ganti nomor whatsapp
# Build ulang & deploy
npm run build && npm run deploy:zip
```

### CSS/JS tidak load (file 404 di Network tab)
**Penyebab**: Path `base` di Vite config tidak match dengan struktur server.

**Solusi**: Cek `vite.config.js` — `base: '/'` jika di root domain, `base: '/subfolder/'` jika di subfolder.

### GitHub Actions: "FTP credentials invalid"
**Penyebab**: Password FTP berubah atau salah.

**Solusi**:
1. Reset password FTP di cPanel
2. Update GitHub Secret `FTP_PASSWORD`
3. Re-run workflow

### Build berhasil tapi website tampil blank
**Penyebab**: JavaScript error — partials gagal load.

**Solusi**:
- Buka DevTools (F12) → Console tab
- Lihat error message
- Biasanya path `/partials/header.html` 404 — pastikan folder `partials/` ada di server

---

## 📚 Resource Tambahan

- **Dokumentasi Domainesia**: https://www.domainesia.com/panduan/
- **cPanel Documentation**: https://docs.cpanel.net/
- **Vite Docs**: https://vitejs.dev/guide/static-deploy.html
- **GitHub Actions Marketplace**: https://github.com/marketplace?type=actions
