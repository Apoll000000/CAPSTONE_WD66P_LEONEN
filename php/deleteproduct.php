<?php
session_start();
include "config.php";

if (isset($_POST['destroy'])) {
    $request = json_decode($_POST['destroy']);

    $sqlCommand = "DELETE FROM tbl_cart WHERE product_id = " . $request->id;
    $isDeletedCart = $connection->query($sqlCommand);

    // Then, delete the product
    $sqlCommand = "DELETE FROM " . TBL_PROD . " WHERE prod_id = " . $request->id;
    $isDeletedProduct = $connection->query($sqlCommand);

    $response = array();

    if ($isDeletedProduct && $isDeletedCart) {
        $response = showAlert("success", "Successfully Deleted");
    } else {
        $response = showAlert("danger", "Error while deleting product");
    }

    echo json_encode($response);
}