<?php
session_start();
include "config.php";

if (isset($_GET['show'])) {
    $request = json_decode($_GET['show']);

    $sqlCommand = "SELECT * FROM " . TBL_PROD . " WHERE prod_id = " . $request->id;
    $results = $connection->query($sqlCommand);

    $response = array();
    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $response = showAlert("success", "Succesful", $records);

    echo json_encode($response);
}
