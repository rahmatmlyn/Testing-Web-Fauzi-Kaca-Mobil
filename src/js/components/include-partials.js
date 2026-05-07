/**
 * INCLUDE PARTIALS
 * Untuk reuse header & footer di semua halaman tanpa duplikasi.
 * Cara pakai di HTML:
 *   <div data-include="/partials/header.html"></div>
 *   <div data-include="/partials/footer.html"></div>
 */

import { $$ } from '../utils/helpers.js';

export async function loadPartials() {
  const placeholders = $$('[data-include]');

  const promises = placeholders.map(async (el) => {
    const path = el.getAttribute('data-include');
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      const html = await response.text();
      el.outerHTML = html;
    } catch (error) {
      console.error('Error loading partial:', path, error);
      el.innerHTML = `<!-- Failed to load ${path} -->`;
    }
  });

  await Promise.all(promises);

  // Trigger custom event setelah semua partials dimuat
  document.dispatchEvent(new CustomEvent('partialsLoaded'));
}
