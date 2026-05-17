<?php
session_start();
if (empty($_SESSION['fkm_admin'])) {
    http_response_code(403);
    exit('Unauthorized');
}

$portfolioFile = __DIR__ . '/../data/portfolio.json';
$uploadDir     = __DIR__ . '/../assets/img/portfolio/';
$uploadUrl     = '/assets/img/portfolio/';
$action        = $_POST['action'] ?? '';

function loadData(string $file): array {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true) ?? [];
}

function saveData(string $file, array $data): void {
    file_put_contents(
        $file,
        json_encode(array_values($data), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );
}

// ── SAVE (add / update) ───────────────────────────────────────────────────────
if ($action === 'save') {
    $items = loadData($portfolioFile);
    $id    = trim($_POST['id'] ?? '');
    $isNew = $id === '';

    if ($isNew) {
        $id = uniqid('p', true);
    }

    // Upload gambar jika ada
    $imagePath = trim($_POST['existing_image'] ?? '');
    if (!empty($_FILES['image']['name'])) {
        $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp'], true)) {
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $filename = 'p-' . time() . '-' . rand(1000, 9999) . '.' . $ext;
            if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $filename)) {
                $imagePath = $uploadUrl . $filename;
            }
        }
    }

    $newItem = [
        'id'               => $id,
        'category'         => $_POST['category']        ?? 'ganti-kaca',
        'car'              => trim($_POST['car']         ?? ''),
        'title'            => trim($_POST['title']       ?? ''),
        'description'      => trim($_POST['description'] ?? ''),
        'service_badge'    => trim($_POST['service_badge'] ?? ''),
        'top_badge'        => trim($_POST['top_badge']   ?? ''),
        'top_badge_color'  => $_POST['top_badge_color']  ?? 'orange',
        'image'            => $imagePath,
        'color'            => $_POST['color']            ?? 'navy',
    ];

    if ($isNew) {
        $items[] = $newItem;
    } else {
        $found = false;
        foreach ($items as &$item) {
            if ($item['id'] === $id) {
                $item  = $newItem;
                $found = true;
                break;
            }
        }
        unset($item);
        if (!$found) {
            $items[] = $newItem;
        }
    }

    saveData($portfolioFile, $items);
    header('Location: panel.php?msg=saved');
    exit;
}

// ── DELETE ────────────────────────────────────────────────────────────────────
if ($action === 'delete') {
    $id    = trim($_POST['id'] ?? '');
    $items = loadData($portfolioFile);
    $items = array_filter($items, fn($i) => $i['id'] !== $id);
    saveData($portfolioFile, $items);
    header('Location: panel.php?msg=deleted');
    exit;
}

header('Location: panel.php');
exit;
