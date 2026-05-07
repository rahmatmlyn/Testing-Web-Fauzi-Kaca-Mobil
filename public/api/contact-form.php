<?php
/**
 * CONTACT FORM HANDLER (OPSIONAL)
 *
 * File ini opsional — secara default, form di /contact.html mengirim
 * pesan langsung ke WhatsApp lewat JavaScript. File ini hanya digunakan
 * jika Anda ingin menerima form submission via email server.
 *
 * Cara aktifkan:
 * 1. Edit $config di bawah dengan email tujuan Anda
 * 2. Pada contact.html, ubah handler form dari JS ke action="/api/contact-form.php"
 * 3. Aktifkan PHP mail di cPanel Domainesia
 *
 * Domainesia mendukung native PHP mail() function di shared hosting.
 */

// =================== KONFIGURASI ===================
$config = [
    'recipient_email'  => 'info@fauzikacamobil.com',
    'subject_prefix'   => '[Form Kontak]',
    'success_redirect' => '/thank-you.html',
    'error_redirect'   => '/contact.html?error=1',
    'allowed_origin'   => 'https://fauzikacamobil.com',
];

// =================== SECURITY: CORS & METHOD ===================
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// Origin check (basic CSRF protection)
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
if (!str_starts_with($origin, $config['allowed_origin'])) {
    http_response_code(403);
    exit('Forbidden');
}

// =================== AMBIL & VALIDASI INPUT ===================
$nama     = trim($_POST['nama'] ?? '');
$whatsapp = trim($_POST['whatsapp'] ?? '');
$mobil    = trim($_POST['mobil'] ?? '');
$lokasi   = trim($_POST['lokasi'] ?? '');
$layanan  = trim($_POST['layanan'] ?? '');
$pesan    = trim($_POST['pesan'] ?? '');

// Honeypot — bot check (tambahkan field hidden bernama 'website' di form)
if (!empty($_POST['website'])) {
    // Ini bot — pura-pura sukses tanpa kirim email
    header('Location: ' . $config['success_redirect']);
    exit;
}

// Validasi minimum
$errors = [];
if (strlen($nama) < 2) {
    $errors[] = 'Nama wajib diisi';
}
if (!preg_match('/^(\+62|62|0)8\d{8,12}$/', preg_replace('/\s|-/', '', $whatsapp))) {
    $errors[] = 'Nomor WhatsApp tidak valid';
}
if (empty($layanan)) {
    $errors[] = 'Pilih jenis layanan';
}

if (!empty($errors)) {
    header('Location: ' . $config['error_redirect']);
    exit;
}

// =================== SANITIZE ===================
$nama     = htmlspecialchars($nama, ENT_QUOTES, 'UTF-8');
$whatsapp = htmlspecialchars($whatsapp, ENT_QUOTES, 'UTF-8');
$mobil    = htmlspecialchars($mobil, ENT_QUOTES, 'UTF-8');
$lokasi   = htmlspecialchars($lokasi, ENT_QUOTES, 'UTF-8');
$layanan  = htmlspecialchars($layanan, ENT_QUOTES, 'UTF-8');
$pesan    = htmlspecialchars($pesan, ENT_QUOTES, 'UTF-8');

// =================== SUSUN EMAIL ===================
$subject = $config['subject_prefix'] . ' ' . $layanan . ' — ' . $nama;

$body = "FORMULIR KONTAK BARU — Fauzi Kaca Mobil\n";
$body .= str_repeat('=', 50) . "\n\n";
$body .= "Nama       : $nama\n";
$body .= "WhatsApp   : $whatsapp\n";
$body .= "Mobil      : $mobil\n";
$body .= "Lokasi     : $lokasi\n";
$body .= "Layanan    : $layanan\n\n";
$body .= "Pesan:\n";
$body .= "$pesan\n\n";
$body .= str_repeat('-', 50) . "\n";
$body .= "Dikirim   : " . date('Y-m-d H:i:s') . "\n";
$body .= "IP        : " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
$body .= "User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . "\n";

$headers = [
    'From: noreply@fauzikacamobil.com',
    'Reply-To: ' . $whatsapp . '@fauzikacamobil.com',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
];

// =================== KIRIM ===================
$success = mail($config['recipient_email'], $subject, $body, implode("\r\n", $headers));

if ($success) {
    header('Location: ' . $config['success_redirect']);
} else {
    error_log('Mail failed: ' . print_r($_POST, true));
    header('Location: ' . $config['error_redirect']);
}
exit;
