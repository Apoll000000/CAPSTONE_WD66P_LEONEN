<?php
include "config.php";

if (isset($_POST['register'])) {
    $registerRequest = json_decode($_POST['register']);
    $response = array();


    if (empty($registerRequest->fname) || empty($registerRequest->lname) || empty($registerRequest->username) || empty($registerRequest->password) || empty($registerRequest->confirmPassword) || empty($registerRequest->barangay) || empty($registerRequest->city) || empty($registerRequest->province) || empty($registerRequest->zipCode) || empty($registerRequest->birthday)) {
        $response = showAlert("warning", "Please fill in all required fields.");
    } elseif ($registerRequest->password != $registerRequest->confirmPassword) {
        $response = showAlert("warning", "Password does not match.");
    } else {
        $password = password_hash($registerRequest->password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO `tbl_users`(`fname`, `lname`, `extname`, `email`, `password`, `barangay`, `city`, `province`, `zipcode`, `birthday`) 
        VALUES ('{$registerRequest->fname}','{$registerRequest->lname}','$registerRequest->extName','{$registerRequest->username}','{$password}','{$registerRequest->barangay}', '{$registerRequest->city}', '{$registerRequest->province}', '{$registerRequest->zipCode}', '{$registerRequest->birthday}')";

        $isInserted = $connection->query($sql);

        if ($isInserted = true) {
            $response = showAlert("success", "Successfully Saved! You can now Login");
        }
    }

    echo json_encode($response);
}