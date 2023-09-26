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

$sql = "SELECT * FROM sd_watering ORDER BY id DESC LIMIT 2024;";
print $sq;

$r = mysqli_query($connect, $sql);

$result["data"] = array();

if ($r) {
    $result["success"] = true;
    if (mysqli_num_rows($r) > 0) {
        while ($row = mysqli_fetch_assoc($r)) {
            $result["data"][] = $row;
        }
    }
}

print json_encode($result);
?>
