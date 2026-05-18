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

export async function initHeroSlider() {
  const container = document.getElementById('hero-card-slider');
  if (!container) return;

  try {
    const res  = await fetch(`/data/portfolio.json?v=${Date.now()}`);
    const data = await res.json();
    const items = data.slice(0, 15);
    if (items.length < 2) return;

    const BADGE = `
      <div style="position:absolute;top:12px;left:12px;background:white;color:#0A1F44;border-radius:9999px;padding:6px 12px;font-size:11px;font-weight:700;display:flex;align-items:center;gap:6px;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:10">
        <svg style="width:14px;height:14px;flex-shrink:0;color:#FF6B1A" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clip-rule="evenodd"/></svg>
        Original Asahi
      </div>`;

    container.innerHTML = items.map((item, i) => {
      const color = COLOR_MAP[item.color] ?? COLOR_MAP.navy;
      const media = item.image
        ? `<img src="${item.image}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;display:block">`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem">${color.emoji}</div>`;
      return `
        <div class="hero-slide" style="
          position:absolute;inset:0;
          background:${color.bg};
          transform:translateX(${i === 0 ? '0' : '100%'});
          transition:transform 700ms cubic-bezier(0.4,0,0.2,1);
          z-index:${i === 0 ? 1 : 0}">
          ${media}
          <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(0,0,0,.65),transparent);padding:.75rem">
            <p style="color:#fff;font-size:11px;font-weight:600;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0">${item.title || item.car}</p>
            <p style="color:rgba(255,255,255,.65);font-size:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0">${item.car}</p>
          </div>
        </div>`;
    }).join('') + BADGE;

    let cur = 0;
    const slides = container.querySelectorAll('.hero-slide');

    setInterval(() => {
      const prev = cur;
      cur = (cur + 1) % items.length;

      slides[prev].style.transform = 'translateX(-100%)';
      slides[prev].style.zIndex    = '0';
      slides[cur].style.zIndex     = '1';
      slides[cur].style.transform  = 'translateX(0)';

      setTimeout(() => {
        slides[prev].style.transition = 'none';
        slides[prev].style.transform  = 'translateX(100%)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          slides[prev].style.transition = 'transform 700ms cubic-bezier(0.4,0,0.2,1)';
        }));
      }, 750);
    }, 3500);

  } catch { /* keep original SVG fallback */ }
}

export async function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  try {
    const res  = await fetch(`/data/portfolio.json?v=${Date.now()}`);
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
