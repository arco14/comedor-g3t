<?php
    session_start(); 
    require __DIR__ . '/vendor/autoload.php';
    use Mike42\Escpos\Printer;
    use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Leer JSON
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $articulos = $data['ARTICULOS'] ?? [];
        $total = $data['TOTAL'] ?? 0;
        $fecha = new DateTime();
        $formatoFecha = $fecha->format('d/m/Y');

        try {
            // Nombre EXACTO de la impresora compartida
            $connector = new WindowsPrintConnector("comedor");
            $printer = new Printer($connector);

            /* ===== ENCABEZADO ===== */
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("Comodor G3T\n");
            $printer->text($formatoFecha);
            $printer->feed();

            /* ===== CUERPO ===== */
            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text("ARTICULO      CANT  PRECIO\n");
            $printer->text("--------------------------------\n");

            foreach ($articulos as $art) {

                $nombre = substr($art['ARTICULOS'], 0, 12); // limitar ancho
                $cant = $art['CANTIDAD'];
                $precio = number_format($art['PRECIO'], 2);

                // Formato alineado
                $linea = str_pad($nombre, 14);
                $linea .= str_pad($cant, 6, ' ', STR_PAD_LEFT);
                $linea .= str_pad('$'.$precio, 10, ' ', STR_PAD_LEFT);

                $printer->text($linea . "\n");
            }

            /* ===== TOTAL ===== */
            $printer->text("--------------------------------\n");
            $printer->setEmphasis(true);
            $printer->text("TOTAL: $" . number_format($total, 2) . "\n");
            $printer->setEmphasis(false);

            /* ===== FINAL ===== */
            $printer->feed(2);
            $printer->cut();
            $printer->close();

            echo json_encode([
                'ok' => true,
                'msg' => 'Ticket impreso correctamente'
            ]);

        } catch (Exception $e) {
            echo json_encode([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
    }
