<?php
session_start();
require_once '_config.php';

if (!empty($_SESSION['fkm_admin'])) {
    header('Location: panel.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (($_POST['password'] ?? '') === ADMIN_PASSWORD) {
        $_SESSION['fkm_admin'] = true;
        header('Location: panel.php');
        exit;
    }
    $error = 'Password salah. Coba lagi.';
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login — Fauzi Kaca Mobil</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl">🔐</span>
      </div>
      <h1 class="text-xl font-bold text-gray-900">Admin Panel</h1>
      <p class="text-sm text-gray-500 mt-1">Fauzi Kaca Mobil — Portfolio</p>
    </div>

    <?php if ($error): ?>
      <div class="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5 flex items-center gap-2">
        <span>⚠️</span> <?= htmlspecialchars($error) ?>
      </div>
    <?php endif; ?>

    <form method="POST" autocomplete="off">
      <div class="mb-5">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
        <input
          type="password"
          name="password"
          class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          placeholder="Masukkan password admin"
          required autofocus>
      </div>
      <button type="submit"
        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition">
        Masuk ke Admin Panel
      </button>
    </form>

    <p class="text-xs text-gray-400 text-center mt-6">
      <a href="/" class="hover:text-gray-600 transition">← Kembali ke Website</a>
    </p>
  </div>
</body>
</html>
