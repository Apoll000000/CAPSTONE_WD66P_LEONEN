<?php
session_start();
include "config.php"; // Include your database connection file

if (isset($_SESSION['user_id'])) {
    $userID = $_SESSION['user_id'];

    $sql = "SELECT * FROM " . TBL_USERS . " WHERE id = $userID";
        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $userInfo = $result->fetch_assoc();
            // Return the user information as JSON
            echo json_encode($userInfo);
        } else {
            // User not found or other error
            echo json_encode(array("error" => "User not found"));
        }
   

}

