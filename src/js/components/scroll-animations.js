/**
 * SCROLL ANIMATIONS
 * Reveal element saat masuk viewport.
 * Cara pakai di HTML: <div data-reveal>, <div data-reveal="left">, <div data-reveal-delay="200">
 */

import { $$ } from '../utils/helpers.js';

export function initScrollAnimations() {
  const elements = $$('[data-reveal]');
  if (!elements.length) return;

  // Untuk browser yang tidak support IntersectionObserver (sangat jarang)
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Counter animation untuk statistik
 * Pakai: <span data-counter="1247" data-counter-suffix="+">0</span>
 */
export function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const duration = parseInt(el.dataset.counterDuration || '2000', 10);
        const suffix = el.dataset.counterSuffix || '';
        const decimals = el.dataset.counterDecimals
          ? parseInt(el.dataset.counterDecimals, 10)
          : 0;

        const startTime = performance.now();

        function update(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          // Ease-out cubic untuk efek natural
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          el.textContent =
            new Intl.NumberFormat('id-ID', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }).format(current) + suffix;

          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}
