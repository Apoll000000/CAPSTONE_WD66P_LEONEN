<?php
session_start();
include "config.php";

if (isset($_POST['destroy'])) {
    $request = json_decode($_POST['destroy']);

    $sqlCommand = "DELETE FROM " . TBL_CART . " WHERE cart_id = " . $request->id;
    $isDeletedCart = $connection->query($sqlCommand);

    $response = array();

    if ($isDeletedCart) {
        $response = showAlert("success", "Successfully Deleted");
    } else {
        $response = showAlert("danger", "Error while deleting cart item");
    }

    echo json_encode($response);
}