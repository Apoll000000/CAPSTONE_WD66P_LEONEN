<?php
session_start();
include "config.php";

if (isset($_SESSION['user_id'])) {
        session_destroy();
    
        $response = showAlert("success", "Successfully Logout");
    
        echo json_encode($response);
}