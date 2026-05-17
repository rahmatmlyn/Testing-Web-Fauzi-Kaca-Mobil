<?php
session_start();
if (empty($_SESSION['fkm_admin'])) {
    header('Location: index.php');
    exit;
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

$portfolioFile = __DIR__ . '/../data/portfolio.json';

function loadData(string $file): array {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true) ?? [];
}

$items  = loadData($portfolioFile);
$action = $_GET['action'] ?? 'list';
$editId = $_GET['id'] ?? '';
$edit   = null;

if ($action === 'edit' && $editId) {
    foreach ($items as $item) {
        if ($item['id'] === $editId) { $edit = $item; break; }
    }
}

$categories = [
    'ganti-kaca'    => 'Ganti Kaca',
    'reparasi-retak'=> 'Reparasi Retak',
    'kaca-film'     => 'Kaca Film',
    'poles-jamur'   => 'Poles Jamur',
    'antar-kaca'    => 'Antar Kaca',
];

$colors = [
    'navy'    => '🔵 Navy (Biru Tua)',
    'emerald' => '🟢 Emerald (Hijau)',
    'blue'    => '🔷 Blue (Biru)',
    'purple'  => '🟣 Purple (Ungu)',
    'teal'    => '🩵 Teal (Hijau Biru)',
    'orange'  => '🟠 Orange (Oranye)',
];

$badgeColors = [
    'orange' => '🟠 Oranye',
    'green'  => '🟢 Hijau',
    'blue'   => '🔵 Biru',
    'red'    => '🔴 Merah',
    'purple' => '🟣 Ungu',
];

$msg = $_GET['msg'] ?? '';
$msgText = match($msg) {
    'saved'   => '✅ Item berhasil disimpan.',
    'deleted' => '🗑️ Item berhasil dihapus.',
    default   => '',
};

function sel(string $val, string $check): string {
    return $val === $check ? 'selected' : '';
}
function esc(mixed $v): string {
    return htmlspecialchars((string)($v ?? ''), ENT_QUOTES);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Portfolio — Fauzi Kaca Mobil</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    [x-cloak] { display:none; }
    .thumb { width:56px; height:56px; object-fit:cover; border-radius:8px; }
  </style>
</head>
<body class="bg-slate-100 min-h-screen">

  <!-- Header -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-xl">🛠️</span>
        <div>
          <div class="font-bold text-gray-900 text-sm">Admin Portfolio</div>
          <div class="text-xs text-gray-500">Fauzi Kaca Mobil</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a href="/" target="_blank"
          class="text-xs text-gray-500 hover:text-gray-800 transition px-3 py-1.5 rounded-lg hover:bg-gray-100">
          🌐 Lihat Website
        </a>
        <a href="?logout=1"
          class="text-xs text-red-500 hover:text-red-700 transition px-3 py-1.5 rounded-lg hover:bg-red-50">
          Logout
        </a>
      </div>
    </div>
  </header>

  <div class="max-w-5xl mx-auto px-4 py-8">

    <!-- Notifikasi -->
    <?php if ($msgText): ?>
      <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
        <?= $msgText ?>
      </div>
    <?php endif; ?>

    <!-- Form Tambah / Edit -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="font-bold text-gray-900">
          <?= $edit ? '✏️ Edit Item' : '➕ Tambah Item Baru' ?>
        </h2>
        <?php if ($edit): ?>
          <a href="panel.php" class="text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
            Batal Edit
          </a>
        <?php endif; ?>
      </div>

      <form action="api.php" method="POST" enctype="multipart/form-data" class="p-6">
        <input type="hidden" name="action" value="save">
        <input type="hidden" name="id" value="<?= esc($edit['id'] ?? '') ?>">
        <input type="hidden" name="existing_image" value="<?= esc($edit['image'] ?? '') ?>">

        <div class="grid sm:grid-cols-2 gap-4">

          <!-- Judul -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Judul *</label>
            <input type="text" name="title" required
              value="<?= esc($edit['title'] ?? '') ?>"
              placeholder="Cth: Ganti Kaca Depan Original Asahi"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
          </div>

          <!-- Mobil -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Merek & Tahun Mobil *</label>
            <input type="text" name="car" required
              value="<?= esc($edit['car'] ?? '') ?>"
              placeholder="Cth: Toyota Innova 2019"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
          </div>

          <!-- Kategori -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Kategori *</label>
            <select name="category"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <?php foreach ($categories as $val => $label): ?>
                <option value="<?= $val ?>" <?= sel($edit['category'] ?? '', $val) ?>><?= $label ?></option>
              <?php endforeach; ?>
            </select>
          </div>

          <!-- Deskripsi -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Deskripsi</label>
            <textarea name="description" rows="2"
              placeholder="Ceritakan singkat pengerjaan ini..."
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"><?= esc($edit['description'] ?? '') ?></textarea>
          </div>

          <!-- Badge Layanan -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Badge Layanan (kanan bawah)</label>
            <input type="text" name="service_badge"
              value="<?= esc($edit['service_badge'] ?? '') ?>"
              placeholder="Cth: Ganti Kaca"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
          </div>

          <!-- Badge Atas -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Badge Atas (opsional)</label>
            <input type="text" name="top_badge"
              value="<?= esc($edit['top_badge'] ?? '') ?>"
              placeholder="Cth: HOME SERVICE"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
          </div>

          <!-- Warna Badge Atas -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Warna Badge Atas</label>
            <select name="top_badge_color"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <?php foreach ($badgeColors as $val => $label): ?>
                <option value="<?= $val ?>" <?= sel($edit['top_badge_color'] ?? 'orange', $val) ?>><?= $label ?></option>
              <?php endforeach; ?>
            </select>
          </div>

          <!-- Warna Latar (jika tidak ada foto) -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Warna Latar (jika tanpa foto)</label>
            <select name="color"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <?php foreach ($colors as $val => $label): ?>
                <option value="<?= $val ?>" <?= sel($edit['color'] ?? 'navy', $val) ?>><?= $label ?></option>
              <?php endforeach; ?>
            </select>
          </div>

          <!-- Upload Foto -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Foto (JPG, PNG, WebP — maks 5MB)</label>
            <?php if (!empty($edit['image'])): ?>
              <div class="mb-2 flex items-center gap-3">
                <img src="<?= esc($edit['image']) ?>" alt="" class="thumb border border-gray-200">
                <span class="text-xs text-gray-500">Foto saat ini. Upload baru untuk mengganti.</span>
              </div>
            <?php endif; ?>
            <input type="file" name="image" accept="image/jpeg,image/png,image/webp"
              class="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-700 file:font-semibold file:cursor-pointer hover:file:bg-orange-100">
          </div>

        </div>

        <div class="mt-5 flex items-center gap-3">
          <button type="submit"
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition">
            <?= $edit ? '💾 Simpan Perubahan' : '➕ Tambah ke Portfolio' ?>
          </button>
          <?php if ($edit): ?>
            <a href="panel.php" class="text-sm text-gray-500 hover:text-gray-800 transition">Batal</a>
          <?php endif; ?>
        </div>
      </form>
    </div>

    <!-- Daftar Item -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="font-bold text-gray-900">📋 Semua Item Portfolio</h2>
        <span class="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-semibold"><?= count($items) ?> item</span>
      </div>

      <?php if (empty($items)): ?>
        <div class="py-16 text-center text-gray-400">
          <div class="text-4xl mb-3">📭</div>
          <p class="text-sm">Belum ada item. Tambahkan yang pertama di atas.</p>
        </div>
      <?php else: ?>
        <div class="divide-y divide-gray-100">
          <?php foreach ($items as $item): ?>
            <?php
              $catLabel = $categories[$item['category']] ?? $item['category'];
              $catColors = [
                'ganti-kaca'     => 'bg-orange-100 text-orange-700',
                'reparasi-retak' => 'bg-green-100 text-green-700',
                'kaca-film'      => 'bg-blue-100 text-blue-700',
                'poles-jamur'    => 'bg-purple-100 text-purple-700',
                'antar-kaca'     => 'bg-teal-100 text-teal-700',
              ];
              $catClass = $catColors[$item['category']] ?? 'bg-gray-100 text-gray-700';
            ?>
            <div class="px-6 py-4 flex items-start gap-4">
              <!-- Thumbnail -->
              <div class="flex-shrink-0">
                <?php if (!empty($item['image'])): ?>
                  <img src="<?= esc($item['image']) ?>" alt="" class="thumb border border-gray-200">
                <?php else: ?>
                  <div class="thumb bg-gray-100 flex items-center justify-center text-2xl border border-gray-200">🚗</div>
                <?php endif; ?>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start gap-2 flex-wrap">
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full <?= $catClass ?>"><?= esc($catLabel) ?></span>
                  <?php if (!empty($item['top_badge'])): ?>
                    <span class="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full"><?= esc($item['top_badge']) ?></span>
                  <?php endif; ?>
                </div>
                <div class="font-semibold text-gray-900 text-sm mt-1.5"><?= esc($item['title']) ?></div>
                <div class="text-xs text-gray-500 mt-0.5"><?= esc($item['car']) ?></div>
                <?php if (!empty($item['description'])): ?>
                  <div class="text-xs text-gray-400 mt-1 line-clamp-2 max-w-lg"><?= esc($item['description']) ?></div>
                <?php endif; ?>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2 flex-shrink-0">
                <a href="?action=edit&id=<?= urlencode($item['id']) ?>"
                  class="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-1.5 rounded-lg transition">
                  ✏️ Edit
                </a>
                <form action="api.php" method="POST"
                  onsubmit="return confirm('Hapus item ini?')">
                  <input type="hidden" name="action" value="delete">
                  <input type="hidden" name="id" value="<?= esc($item['id']) ?>">
                  <button type="submit"
                    class="text-xs bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-3 py-1.5 rounded-lg transition">
                    🗑️ Hapus
                  </button>
                </form>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>

    <p class="text-center text-xs text-gray-400 mt-6">
      Admin Panel · Fauzi Kaca Mobil · <a href="?logout=1" class="hover:text-gray-600">Logout</a>
    </p>
  </div>
</body>
</html>
