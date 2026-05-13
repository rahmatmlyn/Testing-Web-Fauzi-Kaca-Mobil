/**
 * CONTACT FORM VALIDATOR
 * Validasi form sebelum submit, dan kirim ke WhatsApp dengan data terformat
 */

import { SITE_CONFIG } from '../config.js';
import { $, escapeHtml } from '../utils/helpers.js';

export function initContactForm() {
  const form = $('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error state
    form.querySelectorAll('.field-error').forEach((el) => el.remove());
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));

    // Ambil data
    const formData = new FormData(form);
    const data = {
      nama: formData.get('nama')?.trim() || '',
      whatsapp: formData.get('whatsapp')?.trim() || '',
      mobil: formData.get('mobil')?.trim() || '',
      tahun_mobil: formData.get('tahun_mobil')?.trim() || '',
      lokasi: formData.get('lokasi')?.trim() || '',
      layanan: formData.get('layanan') || '',
      pesan: formData.get('pesan')?.trim() || '',
    };

    // Validate
    const errors = [];
    if (!data.nama || data.nama.length < 2) {
      errors.push({ field: 'nama', msg: 'Nama wajib diisi (min 2 karakter)' });
    }
    if (!data.whatsapp || !/^(\+62|62|0)8\d{8,12}$/.test(data.whatsapp.replace(/\s|-/g, ''))) {
      errors.push({ field: 'whatsapp', msg: 'Nomor WhatsApp tidak valid (cth: 082123380339)' });
    }
    if (!data.layanan) {
      errors.push({ field: 'layanan', msg: 'Pilih jenis layanan' });
    }

    if (errors.length) {
      errors.forEach(({ field, msg }) => {
        const input = form.querySelector(`[name="${field}"]`);
        if (input) {
          input.classList.add('is-invalid');
          const errorEl = document.createElement('div');
          errorEl.className = 'field-error';
          errorEl.textContent = msg;
          input.parentNode.appendChild(errorEl);
        }
      });
      const firstErrorField = form.querySelector('.is-invalid');
      firstErrorField?.focus();
      return;
    }

    // Susun pesan WhatsApp yang rapi
    const message = `*BOOKING LAYANAN — Fauzi Kaca Mobil*

*Nama:* ${data.nama}
*WhatsApp:* ${data.whatsapp}
*Mobil:* ${data.mobil || '-'}
*Tahun Mobil:* ${data.tahun_mobil || '-'}
*Lokasi:* ${data.lokasi || '-'}
*Layanan:* ${data.layanan}

*Pesan/Keterangan:*
${data.pesan || '-'}

_Dikirim dari fauzikacamobil.com_`;

    const url = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');

    // Show success state
    const successEl = $('[data-form-success]');
    if (successEl) {
      successEl.classList.add('is-visible');
      form.reset();
      setTimeout(() => successEl.classList.remove('is-visible'), 5000);
    }
  });
}
