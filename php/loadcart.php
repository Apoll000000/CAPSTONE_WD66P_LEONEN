<?php

session_start();
include "config.php";

if (isset($_SESSION['user_id'])) {
    $userID = $_SESSION['user_id'];
    if (isset($_GET['index'])) {
        $sqlCommand = "SELECT c.*, p.* FROM " . TBL_CART . " c
                    INNER JOIN " . TBL_PROD . " p ON c.product_id = p.prod_id
                    WHERE c.user_id = " . $userID;
        $results = $connection->query($sqlCommand);

        $response = array();
        $records = array();

        while ($row = $results->fetch_assoc()) {
            array_push($records, $row);
        }

        $response = showAlert("success", "Successful", $records);

        echo json_encode($response);
    }
}