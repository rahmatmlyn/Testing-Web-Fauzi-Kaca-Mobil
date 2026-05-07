/**
 * UTILITY HELPERS
 * Fungsi-fungsi pembantu yang digunakan di banyak komponen
 */

/**
 * Wait for DOM to be ready
 */
export function onReady(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

/**
 * Query selector shortcut
 */
export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/**
 * Debounce — untuk scroll/resize handler
 */
export function debounce(fn, delay = 200) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle — untuk scroll handler yang harus responsif
 */
export function throttle(fn, limit = 100) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Sanitize HTML untuk mencegah XSS saat memasukkan user-generated content
 */
export function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Format angka ke format Indonesia (1.247 bukan 1,247)
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Smooth scroll ke element dengan offset header sticky
 */
export function smoothScrollTo(targetId, offset = 80) {
  const target = document.querySelector(targetId);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
