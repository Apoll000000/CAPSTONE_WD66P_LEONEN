<?php
session_start();
include "config.php";

if (isset($_POST['auth'])) { 

    $loginRequest = json_decode($_POST['auth']);
    $response = array();

    $sql = "SELECT * FROM " . TBL_USERS . " WHERE email = '" . $loginRequest->username . "'";
    $results = $connection->query($sql);

    $users = array();

    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }
    
    $response = showAlert("warning", "Account doesn't exist");

    foreach ($users as $user) {
        //db vs sa input
        if (password_verify($loginRequest->password, $user['password'])) {
            $response = showAlert("success", "Login Successful");
            $_SESSION['user_id'] = $user['id'];
        } else {
            $response = showAlert("danger", "Wrong Username or Password");
        }
    }


    echo json_encode($response);
}


if (isset($_SESSION['user_id'])) {
    if (isset($_POST['loggedout'])) {
        session_destroy();
    
        $response = showAlert("success", "Successfully Logout");
    
        echo json_encode($response);
    }
}


?>