<?php
session_start();
require_once '_config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'msg' => 'Method not allowed']);
    exit;
}

if (($_POST['password'] ?? '') === ADMIN_PASSWORD) {
    $_SESSION['fkm_admin'] = true;
    echo json_encode(['ok' => true]);
} else {
    echo json_encode(['ok' => false, 'msg' => 'Password salah. Coba lagi.']);
}
