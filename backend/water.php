<?php
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: http://localhost:4200");

    include ('./init.php');
    include ('./functions.php');

    $sensorId = $_POST['sensor_id'];
    $method = $_POST['method'];

    $file = 'water.csv';

    $row = array($sensorId, $method);
    $result = array(
      'success' => false,
      'message' => null
    );

    try {
        $handle = fopen($file, 'a');
        fputcsv($handle, $row);
        fclose($handle);

        $result['success'] = true;
    } catch (Exception $e) {
        $result['message'] = $e -> getMessage();
    }

    print(json_encode($result));
?>
