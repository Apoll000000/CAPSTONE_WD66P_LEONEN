<?php

session_start();
include "config.php";

if (isset($_SESSION['user_id'])) {
    $userID = $_SESSION['user_id'];


    if (isset($_FILES['profile'])) {
        $profile = $_FILES['profile'];
        $targetDir = 'uploads/';
        $targetFile = $targetDir . "/" . $profile['name'];
        $profileExtension = pathinfo($profile['name'], PATHINFO_EXTENSION);
        $img_extension = strtolower($profileExtension);
        $allowed = array("jpg", "jpeg", "png", "img");
    
        if (in_array($img_extension, $allowed)) {
            if (move_uploaded_file($profile['tmp_name'], $targetFile)) {
                $sqlCommand = "UPDATE " . TBL_USERS . " SET 
                profilepicture = '{$targetFile}'
                WHERE id = '{$userID}'
                ";
            $isUploaded = $connection->query($sqlCommand);
            if ($isUploaded) {
                $response = showAlert("success", "Successfully Updated Profile Picture");
            } else {
             $response = showAlert("warning", "error uploading profile picture");
        }
    
    echo json_encode($response);
            }
    
        } else {
            $response = showAlert("danger", "your file is not an image");
            echo json_encode($response);
        }
    }   

}

