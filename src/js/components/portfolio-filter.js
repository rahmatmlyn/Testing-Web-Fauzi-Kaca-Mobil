export function initPortfolioFilter() {
  const filterContainer = document.querySelector('[data-portfolio-filters]');
  if (!filterContainer) return;

  const buttons = filterContainer.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button style
      buttons.forEach((b) => {
        b.classList.remove('bg-accent-500', 'text-white');
        b.classList.add('bg-gray-100', 'hover:bg-gray-200');
      });
      btn.classList.add('bg-accent-500', 'text-white');
      btn.classList.remove('bg-gray-100', 'hover:bg-gray-200');

      // Show/hide cards
      cards.forEach((card) => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}
