<?php

header('Content-Type: application/json');

// Archivo
if (!isset($_FILES['fileImg'])) {
    echo json_encode([
        'ok' => false,
        'msg' => 'No llegó el archivo'
    ]);
    exit;
}

$archivo = $_FILES['fileImg'];
$nombreImg = pathinfo($archivo['name'], PATHINFO_FILENAME);
$extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
$nombreArchivo = $nombreImg . "." . $extension;
$ruta = "./assets/img/" . $nombreArchivo;

if (!move_uploaded_file($archivo['tmp_name'], $ruta)) {
    echo json_encode([
        'ok' => false,
        'msg' => 'Error al guardar archivo'
    ]);
    exit;
}

// echo json_encode([
//     'ok' => true,
//     'archivo' => $nombreArchivo
// ]);
