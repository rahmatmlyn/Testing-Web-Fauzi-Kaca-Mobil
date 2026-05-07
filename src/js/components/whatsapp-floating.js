/**
 * FLOATING WHATSAPP BUTTON
 * Tombol WA mengambang yang muncul setelah user scroll sedikit
 */

import { SITE_CONFIG, getWhatsAppUrl } from '../config.js';
import { $, throttle } from '../utils/helpers.js';

export function initFloatingWhatsApp() {
  const btn = $('[data-floating-wa]');
  if (!btn) return;

  // Set href dinamis
  btn.setAttribute('href', getWhatsAppUrl());

  // Show/hide berdasarkan scroll
  const handleScroll = throttle(() => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}
