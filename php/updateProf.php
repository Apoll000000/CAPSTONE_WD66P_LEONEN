<?php
session_start();
include "config.php"; 

if (isset($_SESSION['user_id'])) {
    $userID = $_SESSION['user_id'];

    if (isset($_POST['updateProfile'])) {
        $request = json_decode($_POST['updateProfile']);
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        // Check if any required field is empty
        if (!empty($request->password) || !empty($request->confirmpassword)) {
            if ($request->password == $request->confirmpassword) {
                $sqlCommand = "UPDATE " . TBL_USERS . " SET 
            fname = '{$request->fname}',
            lname = '{$request->lname}',
            extname = '{$request->extname}',
            birthday = '{$request->birthday}',
            city = '{$request->city}',
            barangay = '{$request->barangay}',
            province = '{$request->province}',
            email = '{$request->email}',
            zipcode = '{$request->zipcode}',
            password = '{$password}'
            WHERE id = '{$userID}'
            ";
            $isUpdated = $connection->query($sqlCommand);

            $response = array();

            if ($isUpdated) {
                $response = showAlert("success", "Successfully Updated user");
                
            } else {
                $response = showAlert("danger", "Error while updating user");
            }

                    echo json_encode($response);
            } else {
                $response = showAlert("danger", "Password does not match");
            }
        } else if (empty($request->password) || empty($request->confirmpassword)) {
            $sqlCommand = "UPDATE " . TBL_USERS . " SET 
            fname = '{$request->fname}',
            lname = '{$request->lname}',
            extname = '{$request->extname}',
            birthday = '{$request->birthday}',
            city = '{$request->city}',
            barangay = '{$request->barangay}',
            province = '{$request->province}',
            email = '{$request->email}',
            zipcode = '{$request->zipcode}'
            WHERE id = '{$userID}'
            ";
            $isUpdated = $connection->query($sqlCommand);

            $response = array();

            if ($isUpdated) {
                $response = showAlert("success", "Successfully Updated user");
                
            } else {
                $response = showAlert("danger", "Error while updating user");
            }

            $response = showAlert("success", "Successfully Updated user");
        }

        echo json_encode($response);
    } 
}