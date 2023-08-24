<?php
session_start();
include "config.php";

if (isset($_SESSION['user_id'])) {
    $userID = $_SESSION['user_id'];
    if (isset($_POST['checkoutData'])) {
        $cartData = json_decode($_POST['checkoutData'], true);
        $selectedItems = $cartData['selectedItems'];
        $totalAmount = $cartData['totalAmount'];
        $response = array();

        foreach ($selectedItems as $item) {
            $cart_id = $item['cart_id'];
            $checkout_id = generateUniqueID();

            $sql = "INSERT INTO `" . TBL_COUT . "` (`checkout_id`, `user_id`, `cart_id`, `total_amount`) 
            VALUES ('{$checkout_id}', '{$userID}', '{$cart_id}', '{$totalAmount}')";

            $isInserted = $connection->query($sql);
            if ($isInserted) {
                $response[] = showAlert("success", "Checkout Successful");
            } else {
                $response[] = showAlert("danger", "Checkout Unsuccessful");
            }
        }

        echo json_encode($response);
    }
}
?>










