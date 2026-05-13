/**
 * TESTIMONIAL SLIDER
 * Render testimoni dan animasi auto-slide horizontal
 */

import { TESTIMONIALS } from '../data/testimonials.js';
import { $, escapeHtml } from '../utils/helpers.js';

function renderStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

export function renderTestimonials(targetSelector = '[data-testimonial-list]') {
  const container = $(targetSelector);
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map((t) => `
    <article class="testimonial-card" data-testimonial-id="${t.id}">
      <div class="testimonial-rating">${renderStars(t.rating)}</div>
      ${t.serviceType ? `<div class="testimonial-service">${escapeHtml(t.serviceType)}</div>` : ''}
      <blockquote class="testimonial-quote">"${escapeHtml(t.quote)}"</blockquote>
      <div class="testimonial-author">
        <div class="testimonial-avatar" aria-hidden="true">
          ${escapeHtml(t.name.charAt(0))}
        </div>
        <div class="testimonial-info">
          <div class="testimonial-name">
            ${escapeHtml(t.name)}
            ${t.verified ? '<span class="testimonial-verified" title="Verified"><svg class="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clip-rule="evenodd"/></svg></span>' : ''}
          </div>
          <div class="testimonial-meta">${escapeHtml(t.location)} · ${escapeHtml(t.car)}</div>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Init horizontal scroll dengan tombol prev/next
 */
export function initTestimonialSlider() {
  const track = $('[data-testimonial-list]');
  const prevBtn = $('[data-testimonial-prev]');
  const nextBtn = $('[data-testimonial-next]');

  if (!track) return;

  const scrollAmount = () => {
    const card = track.querySelector('.testimonial-card');
    if (!card) return 200; // fallback jika tidak ada card
    const gap = parseInt(getComputedStyle(track).gap || '16', 10);
    return card.offsetWidth + gap;
  };

  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
}
