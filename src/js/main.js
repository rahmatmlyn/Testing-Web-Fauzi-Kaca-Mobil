/**
 * MAIN ENTRY POINT
 * Initialize semua komponen sesuai elemen yang ada di halaman.
 * File ini di-import di setiap HTML page sebagai module.
 */

// Import CSS — Vite akan bundle & inject sebagai <link> di build output
import '../styles/main.css';

import { onReady } from './utils/helpers.js';
import { loadPartials } from './components/include-partials.js';
import { initMobileMenu, initStickyHeader, initActiveLink } from './components/mobile-menu.js';
import { initFloatingWhatsApp } from './components/whatsapp-floating.js';
import { renderFAQ, initFAQAccordion } from './components/faq-accordion.js';
import { renderTestimonials, initTestimonialSlider } from './components/testimonial-slider.js';
import { initScrollAnimations, initCounters } from './components/scroll-animations.js';
import { initContactForm } from './components/form-validator.js';
import { initAdminModal } from './components/admin-modal.js';
import { initPortfolio } from './components/portfolio.js';
import { SITE_CONFIG, getWhatsAppUrl } from './config.js';

// Inject WhatsApp link ke semua tombol [data-wa-link]
function injectWhatsAppLinks() {
  document.querySelectorAll('[data-wa-link]').forEach((el) => {
    const customMsg = el.getAttribute('data-wa-message');
    el.setAttribute('href', getWhatsAppUrl(customMsg));
  });

  // Admin Bandung
  document.querySelectorAll('[data-wa-bandung-link]').forEach((el) => {
    const msg = el.getAttribute('data-wa-message') || SITE_CONFIG.contact.whatsappMessage;
    el.setAttribute('href', `https://wa.me/${SITE_CONFIG.contact.whatsappBandung}?text=${encodeURIComponent(msg)}`);
  });
}

// Inject info brand ke elemen [data-brand="..."]
function injectBrandInfo() {
  const map = {
    'brand-name': SITE_CONFIG.brand.name,
    'brand-tagline': SITE_CONFIG.brand.tagline,
    'brand-phone': SITE_CONFIG.contact.phone,
    'brand-email': SITE_CONFIG.contact.email,
    'brand-address': `${SITE_CONFIG.contact.address.street}, ${SITE_CONFIG.contact.address.city}`,
    'brand-hours': `${SITE_CONFIG.hours.daysOpen}, ${SITE_CONFIG.hours.weekdays}`,
    'brand-year': new Date().getFullYear(),
  };

  document.querySelectorAll('[data-brand]').forEach((el) => {
    const key = el.getAttribute('data-brand');
    if (map[key] !== undefined) el.textContent = map[key];
  });

  // Update href tel:
  document.querySelectorAll('[data-tel-link]').forEach((el) => {
    el.setAttribute('href', `tel:${SITE_CONFIG.contact.phoneRaw}`);
  });
}

// Bootstrap
onReady(async () => {
  // 1. Load header & footer partials terlebih dulu
  await loadPartials();

  // 2. Inject brand info & WA links setelah partials loaded
  injectBrandInfo();
  injectWhatsAppLinks();

  // 3. Init komponen umum (di semua halaman)
  initMobileMenu();
  initStickyHeader();
  initActiveLink();
  initFloatingWhatsApp();

  // 4. Init komponen yang conditional (hanya jalan jika elemennya ada)
  renderFAQ();
  initFAQAccordion(false); // false = multiple bisa terbuka, true = single

  renderTestimonials();
  initTestimonialSlider();

  initScrollAnimations();
  initCounters();

  initContactForm();
  initPortfolio();
  initAdminModal();

  // 5. Hilangkan loading state
  document.body.classList.add('is-loaded');
});

// Export untuk debugging via console
window.__FAUZI__ = { SITE_CONFIG };
