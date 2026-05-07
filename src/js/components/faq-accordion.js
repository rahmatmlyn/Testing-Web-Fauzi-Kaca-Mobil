/**
 * FAQ ACCORDION
 * Render data FAQ ke HTML dan handle interaksi expand/collapse.
 * Pakai pattern <details>/<summary> untuk a11y + progressive enhancement.
 */

import { FAQ_DATA } from '../data/faq.js';
import { $, escapeHtml } from '../utils/helpers.js';

export function renderFAQ(targetSelector = '[data-faq-list]') {
  const container = $(targetSelector);
  if (!container) return;

  const html = FAQ_DATA.map((category, catIdx) => `
    <div class="faq-category" data-category-index="${catIdx}">
      <h3 class="faq-category-title">${escapeHtml(category.category)}</h3>
      <div class="faq-items">
        ${category.items.map((item, idx) => `
          <details class="faq-item" data-faq-index="${catIdx}-${idx}">
            <summary class="faq-question">
              <span class="faq-question-text">${escapeHtml(item.question)}</span>
              <span class="faq-icon" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </summary>
            <div class="faq-answer">
              <p>${item.answer}</p>
            </div>
          </details>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

/**
 * Behavior: hanya satu accordion terbuka pada satu waktu (opsional)
 */
export function initFAQAccordion(singleOpen = false) {
  if (!singleOpen) return;

  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });
}
