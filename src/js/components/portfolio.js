const COLOR_MAP = {
  navy:    { bg: 'linear-gradient(135deg,#1A3870,#0A1F44)', emoji: '🚗' },
  emerald: { bg: 'linear-gradient(135deg,#047857,#065f46)', emoji: '🔧' },
  blue:    { bg: 'linear-gradient(135deg,#1d4ed8,#1e3a8a)', emoji: '🎬' },
  purple:  { bg: 'linear-gradient(135deg,#7c3aed,#4c1d95)', emoji: '✨' },
  teal:    { bg: 'linear-gradient(135deg,#0d9488,#0f766e)', emoji: '🚚' },
  orange:  { bg: 'linear-gradient(135deg,#c2410c,#7c2d12)', emoji: '🚙' },
};

const BADGE_COLOR_MAP = {
  orange: '#f97316',
  green:  '#22c55e',
  blue:   '#3b82f6',
  red:    '#ef4444',
  purple: '#a855f7',
};

function buildCard(item) {
  const color = COLOR_MAP[item.color] ?? COLOR_MAP.navy;
  const badgeBg = BADGE_COLOR_MAP[item.top_badge_color] ?? '#f97316';

  const imageContent = item.image
    ? `<img src="${item.image}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover">`
    : `<div class="absolute inset-0 flex items-center justify-center text-7xl">${color.emoji}</div>`;

  const topBadge = item.top_badge
    ? `<span class="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded-full" style="background:${badgeBg}">${item.top_badge}</span>`
    : '';

  const serviceBadge = item.service_badge
    ? `<span class="absolute bottom-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">${item.service_badge}</span>`
    : '';

  return `
    <article class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition"
      data-category="${item.category}">
      <div class="aspect-[4/3] relative overflow-hidden" style="background:${color.bg}">
        ${imageContent}
        ${topBadge}
        ${serviceBadge}
      </div>
      <div class="p-5">
        <div class="text-xs text-gray-500 uppercase tracking-wider mb-1">${item.car}</div>
        <h3 class="font-bold text-navy-900 mb-2">${item.title}</h3>
        <p class="text-sm text-gray-600 leading-relaxed">${item.description}</p>
      </div>
    </article>`;
}

function initFilter(grid) {
  const filterContainer = document.querySelector('[data-portfolio-filters]');
  if (!filterContainer) return;

  const buttons = filterContainer.querySelectorAll('[data-filter]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      buttons.forEach((b) => {
        b.classList.remove('bg-accent-500', 'text-white');
        b.classList.add('bg-gray-100', 'hover:bg-gray-200');
      });
      btn.classList.add('bg-accent-500', 'text-white');
      btn.classList.remove('bg-gray-100', 'hover:bg-gray-200');

      grid.querySelectorAll('[data-category]').forEach((card) => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

export async function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  try {
    const res  = await fetch('/data/portfolio.json');
    const data = await res.json();

    if (!data.length) {
      grid.innerHTML = `<div class="col-span-full py-20 text-center text-gray-400">
        <div class="text-4xl mb-3">📭</div>
        <p>Belum ada portfolio. Tambahkan melalui admin panel.</p>
      </div>`;
      return;
    }

    grid.innerHTML = data.map(buildCard).join('');
    initFilter(grid);
  } catch {
    grid.innerHTML = `<div class="col-span-full py-20 text-center text-gray-400">
      <p>Gagal memuat portfolio.</p>
    </div>`;
  }
}
