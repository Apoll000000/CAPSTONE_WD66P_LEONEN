<?php

session_start();
include "config.php";


if (isset($_SESSION['user_id'])) {
    $userID = $_SESSION['user_id'];
         if (isset($_POST['cartData'])) {
            $cartinfo = json_decode($_POST['cartData']);
            $response = array();
        
                $sql = "INSERT INTO `tbl_cart`(`user_id`, `product_id`, `quantity`) 
                VALUES ('{$userID}','$cartinfo->productId','{$cartinfo->productQty}')";
        
                $isInserted = $connection->query($sql);
        
                if ($isInserted = true) {
                    $response = showAlert("success", "Product Added to Cart Successfully");
                }
            echo json_encode($response);
        }
    }