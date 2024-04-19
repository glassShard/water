<?php
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: http://localhost:4200");

    include ('./init.php');
    include ('./functions.php');

    $sensor = json_decode($_POST['sensor'], true);

    $sql = "INSERT INTO sd_watering (soil1, soil2, soil3, soil4, relay1, relay2, relay3, relay4)
        VALUES (".$sensor['soil1'].", ".$sensor['soil2'].", ".$sensor['soil3'].", ".$sensor['soil4'].", ".$sensor['relay1'].", ".$sensor['relay2'].", ".$sensor['relay3'].", ".$sensor['relay4'].");";

    $r = mysqli_query($connect, $sql);
?>
