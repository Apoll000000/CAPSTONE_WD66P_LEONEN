<?php

session_start();
include "config.php";

    if (isset($_GET['index'])) {
        $sqlCommand = "SELECT * FROM " . TBL_PROD . " WHERE productCategory = 8";
        $results = $connection->query($sqlCommand);

        $response = array();
        $records = array();

        while ($row = $results->fetch_assoc()) {
            array_push($records, $row);
        }

        $response = showAlert("success", "Successful", $records);

        echo json_encode($response);
    }