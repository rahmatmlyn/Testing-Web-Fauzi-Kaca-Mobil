/**
 * MOBILE MENU + STICKY HEADER
 * Hamburger menu untuk mobile, dengan animasi slide-in drawer
 */

import { $, throttle } from '../utils/helpers.js';

export function initMobileMenu() {
  const toggle = $('[data-mobile-menu-toggle]');
  const drawer = $('[data-mobile-menu-drawer]');
  const overlay = $('[data-mobile-menu-overlay]');
  const closeBtn = $('[data-mobile-menu-close]');
  const links = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggle || !drawer) return;

  function openMenu() {
    drawer.classList.add('is-open');
    overlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    drawer.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Tutup menu saat klik link
  links.forEach((link) => link.addEventListener('click', closeMenu));

  // Tutup dengan ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/**
 * Sticky header — beri shadow saat scroll
 */
export function initStickyHeader() {
  const header = $('[data-header]');
  if (!header) return;

  const handleScroll = throttle(() => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, 50);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Active link highlighter berdasarkan halaman aktif
 */
export function initActiveLink() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const links = document.querySelectorAll('header a[href]');

  links.forEach((link) => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('is-active');
    }
  });
}
