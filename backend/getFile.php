<?php
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Origin: http://localhost:4200");

  include ('init.php');
  include ('functions.php');

  $result = array(
      "success" => false,
      "message" => null,
      "data" => null
  );

  $filename = "water.csv";

  $result['data'] = array();
  $file = fopen($filename, "r");

  if ($file !== FALSE) {
      while (($row = fgetcsv($file)) !== FALSE) {
          $result['data'][] = $row;
      }

      fclose($file);
  } else {
      $result['message'] = 'Could not open file.'
  }

  print json_encode($result);
?>

