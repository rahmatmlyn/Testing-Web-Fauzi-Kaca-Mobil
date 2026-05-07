# 📝 Content Update Guide

Panduan untuk update konten website tanpa perlu skill programming yang dalam.

## 🎯 Quick Reference

| Mau ganti apa? | Edit file ini |
|----------------|---------------|
| Nomor WhatsApp / telp / email | `src/js/config.js` |
| Daftar layanan & harga | `src/js/data/services.js` |
| Testimoni pelanggan | `src/js/data/testimonials.js` |
| Pertanyaan FAQ | `src/js/data/faq.js` |
| Teks halaman beranda | `index.html` |
| Cerita "Tentang Kami" | `about.html` |
| Detail layanan | `services.html` |
| Galeri foto | `portfolio.html` |
| Form kontak | `contact.html` |
| Header & menu navigasi | `public/partials/header.html` |
| Footer & link | `public/partials/footer.html` |
| Warna brand | `tailwind.config.js` |

---

## 🔧 Workflow Update Konten

### Setiap kali update konten:

```bash
# 1. Pull versi terbaru dari GitHub
git pull origin main

# 2. Edit file yang ingin diubah
# (pakai VS Code atau editor pilihan)

# 3. Tes di lokal
npm run dev
# Buka http://localhost:3000

# 4. Jika sudah OK, commit & push
git add .
git commit -m "update: deskripsi perubahan"
git push origin main

# 5. GitHub Actions akan auto-deploy dalam 2-3 menit
```

---

## 📋 Contoh Skenario Update

### Skenario 1: Ganti nomor WhatsApp

Edit `src/js/config.js`:

```js
contact: {
  phone: '+62 813-9876-5432',          // ← ganti ini
  phoneRaw: '+6281398765432',          // ← dan ini
  whatsapp: '6281398765432',           // ← dan ini (TANPA + atau spasi)
  ...
}
```

Save file → commit → push.

### Skenario 2: Tambah testimoni baru

Edit `src/js/data/testimonials.js`, tambahkan object di akhir array:

```js
{
  id: 7,
  name: 'Bapak Budi Santoso',
  location: 'Tangerang Selatan',
  car: 'Daihatsu Xenia 2020',
  avatar: '/assets/img/testimonials/avatar-7.jpg',
  rating: 5,
  serviceType: 'Ganti Kaca Depan',
  quote: 'Pelayanan cepat, hasil rapi. Recommended!',
  verified: true,
},
```

Save → otomatis muncul di slider testimoni homepage.

### Skenario 3: Tambah layanan baru

Edit `src/js/data/services.js`:

```js
{
  id: 'kaca-belakang',
  slug: 'kaca-belakang-mobil',
  icon: '🚙',
  iconSvg: 'car',
  badge: 'Baru',
  badgeColor: 'orange',
  title: 'Spesialis Kaca Belakang',
  shortDesc: 'Layanan khusus untuk kaca belakang dengan defogger.',
  fullDesc: '...deskripsi panjang...',
  features: [
    'Defogger original',
    'Pemasangan rapi',
  ],
  duration: '1-2 jam',
  warranty: '12 bulan',
  priceRange: 'Mulai Rp 1.200.000',
  image: '/assets/img/services/kaca-belakang.jpg',
},
```

### Skenario 4: Ubah teks hero homepage

Edit `index.html`, cari section dengan tag `<h1>` di hero:

```html
<h1 class="text-4xl sm:text-5xl lg:text-6xl ...">
  Kaca Mobil Pecah?<br>
  <span class="text-accent-500">Tenang.</span> ...   <!-- edit teks ini -->
</h1>
```

### Skenario 5: Ganti foto layanan

1. Siapkan foto baru (rekomendasi: 1200x800px, JPG, < 200KB)
2. Compress dulu di [TinyPNG](https://tinypng.com/) atau [Squoosh](https://squoosh.app/)
3. Upload ke `public/assets/img/services/` (lewat VS Code drag & drop)
4. Update reference di `src/js/data/services.js`:
   ```js
   image: '/assets/img/services/foto-baru.jpg',
   ```

### Skenario 6: Update warna brand

Edit `tailwind.config.js`:

```js
colors: {
  navy: {
    700: '#YOURCOLOR',
    800: '#YOURCOLOR',
    900: '#YOURCOLOR',
  },
  accent: {
    400: '#YOURCOLOR',
    500: '#YOURCOLOR',  // ← warna utama (CTA buttons)
    600: '#YOURCOLOR',
  },
},
```

Save → run `npm run dev` → cek visual → commit.

---

## ✅ Checklist Sebelum Push

Sebelum `git push`, pastikan:

- [ ] **Format kode rapi**: jalankan `npm run format`
- [ ] **No syntax error**: `npm run build` berhasil tanpa error
- [ ] **Tampilan OK**: Cek di browser (`npm run dev`)
- [ ] **Responsive**: Cek di mobile view (DevTools → Toggle device toolbar)
- [ ] **Link works**: Klik tombol-tombol penting (WhatsApp, telp, navigation)
- [ ] **No typo**: Baca ulang teks yang baru di-edit

---

## 🆘 Bantuan Cepat

### "Saya tidak yakin perubahan akan tampil bagus"
Pakai **branch baru** untuk eksperimen:
```bash
git checkout -b experiment/konten-baru
# ...edit & test...
# Kalau hasilnya bagus → merge ke main
# Kalau jelek → tinggal hapus branch
git checkout main
git branch -D experiment/konten-baru
```

### "Saya merusak sesuatu, gimana revert?"
```bash
# Lihat history commit
git log --oneline

# Revert commit terakhir (yang merusak)
git revert HEAD
git push

# Atau hard reset ke commit tertentu
git reset --hard <commit-hash>
git push --force-with-lease
```

### "Saya butuh help untuk hal teknis"
- Buka **[Issue baru di GitHub](../../issues/new/choose)**
- Atau hubungi developer Anda

---

## 📚 Tips Menulis Konten yang Bagus

1. **Pendek & jelas** — paragraf 2-3 kalimat lebih baik dari 1 paragraf panjang
2. **Sapa pembaca** — pakai "Anda" bukan "user" atau "pelanggan"
3. **Tonjolkan benefit** — bukan fitur. "Selesai 1 jam" lebih menarik dari "Pengerjaan cepat"
4. **Pakai bullet point** untuk list 3+ item
5. **CTA jelas** — di akhir setiap section, kasih tahu pembaca apa yang harus dilakukan
6. **Mobile-first** — preview di HP, banyak orang akses dari mobile
