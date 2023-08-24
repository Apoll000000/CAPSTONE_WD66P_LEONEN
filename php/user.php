<?php
session_start();
include "config.php"; 

if (isset($_SESSION['user_id'])) {
    $userID = $_SESSION['user_id'];
    $sql = "SELECT * FROM " . TBL_USERS . " WHERE id = $userID";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $userInfo = $result->fetch_assoc();
   
        echo json_encode($userInfo);
    } else {

        echo json_encode(array("error" => "User not found"));
    }
} else {

    echo json_encode(array("error" => "Not logged in"));
}
?>