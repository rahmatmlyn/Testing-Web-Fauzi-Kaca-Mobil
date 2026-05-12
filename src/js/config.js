/**
 * SITE CONFIGURATION
 * Edit nilai di file ini untuk mengubah info brand di seluruh website
 * tanpa perlu menyentuh HTML.
 */

export const SITE_CONFIG = {
  // Brand Identity
  brand: {
    name: 'Fauzi Kaca Mobil',
    tagline: 'Spesialis Kaca Mobil Sejak 2012',
    description: 'Spesialis ganti kaca mobil, reparasi retak & kaca film panggilan se-Jabodetabek.',
    foundedYear: 2012,
  },

  // Contact Info — Ganti dengan data asli sebelum deploy
  contact: {
    phone: '+62 821-2338-0339',
    phoneRaw: '+6282123380339',          // untuk href="tel:"
    whatsapp: '6282123380339',           // tanpa + atau spasi
    whatsappMessage: 'Halo Fauzi Kaca Mobil, saya ingin bertanya tentang layanan kaca mobil...',
    email: 'info@fauzikacamobil.com',
    address: {
      street: 'Jl. Raya Bogor KM. 25 No. 99',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
      postalCode: '13760',
      country: 'Indonesia',
    },
    coordinates: { lat: -6.3000, lng: 106.8800 },
    googleMapsUrl: 'https://maps.app.goo.gl/xxxxxxxxxxx',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.xxx',
  },

  // Operasional
  hours: {
    weekdays: '08.00 – 21.00',
    weekend: '08.00 – 21.00',
    emergency: '24 Jam (Layanan Darurat)',
    daysOpen: 'Senin – Minggu',
  },

  // Social Media
  social: {
    instagram: 'https://instagram.com/fauzikacamobil',
    facebook: 'https://facebook.com/fauzikacamobil',
    youtube: 'https://youtube.com/@fauzikacamobil',
    tiktok: 'https://tiktok.com/@fauzikacamobil',
    googleBusiness: 'https://g.page/fauzikacamobil',
  },

  // Service Area
  serviceArea: [
    'Jakarta Pusat', 'Jakarta Utara', 'Jakarta Selatan',
    'Jakarta Timur', 'Jakarta Barat',
    'Bogor Kota', 'Kabupaten Bogor',
    'Depok', 'Tangerang Kota', 'Tangerang Selatan',
    'Kabupaten Tangerang', 'Bekasi Kota', 'Kabupaten Bekasi',
  ],

  // Statistics (untuk hero & trust badge)
  stats: {
    yearsExperience: 12,
    carsServiced: 1247,
    googleRating: 4.9,
    googleReviews: 320,
    warrantyMonths: 12,
  },

  // SEO Defaults
  seo: {
    siteUrl: 'https://fauzikacamobil.com',
    defaultTitle: 'Fauzi Kaca Mobil — Ganti Kaca Mobil Panggilan Jabodetabek',
    defaultDescription: 'Spesialis ganti kaca mobil, reparasi retak & kaca film panggilan se-Jabodetabek. Teknisi datang 1–3 jam. Kaca original, garansi 1 tahun.',
    ogImage: '/assets/img/og-image.jpg',
    locale: 'id_ID',
    keywords: 'ganti kaca mobil, bengkel kaca mobil, kaca mobil panggilan, reparasi kaca retak, kaca film mobil, kaca mobil Jakarta, home service kaca mobil, Fauzi Kaca Mobil',
  },
};

/**
 * Helper untuk generate WhatsApp link dengan custom message
 */
export function getWhatsAppUrl(customMessage) {
  const message = customMessage || SITE_CONFIG.contact.whatsappMessage;
  return `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper untuk format nomor telepon untuk display
 */
export function formatPhone(raw = SITE_CONFIG.contact.phone) {
  return raw;
}
