<?php

function showAlert($alertType, $message, $data = array()) {
        $response = array();
        $response["alertType"] = $alertType;
        $response["message"] = $message;
        $response["data"] = $data;
        
        return $response;
    }

    function generateUniqueID() {
        return uniqid();
    }