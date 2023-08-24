<?php
session_start();
include "config.php";


if (isset($_POST['productName']) && isset($_POST['productPrice']) && isset($_POST['productStock']) && isset($_POST['productDescription']) && isset($_FILES['productImage'])) {
    $productName = $_POST['productName'];
    $productPrice = $_POST['productPrice'];
    $productStock = $_POST['productStock'];
    $productDescription = $_POST['productDescription'];
    $productImage = $_FILES['productImage'];
    $productCategory = $_POST['productCategory'];

    $targetDir = 'uploads/';
    $targetFile = $targetDir . "/" . $productImage['name'];
    $productExtension = pathinfo($productImage['name'], PATHINFO_EXTENSION);
    $img_extension = strtolower($productExtension);
    $allowed = array("jpg", "jpeg", "png", "img");

    if (in_array($img_extension, $allowed)) {
        if (move_uploaded_file($productImage['tmp_name'], $targetFile)) {
            $sql = "INSERT INTO `" . TBL_PROD . "` (`user_id`, `productName`, `productPrice`, `productDescription`, `productStock`, `productImage`, `productCategory`) 
                VALUES ('{$_SESSION['user_id']}', '{$productName}','{$productPrice}','{$productDescription}','{$productStock}', '{$targetFile}', '{$productCategory}')";
                $isInserted = $connection->query($sql);

                if ($isInserted) {
                    $response = showAlert("success", "Successfully Added Product");
                } else {
                 $response = showAlert("warning", "Cannot Add Product");
            }

    echo json_encode($response);

} else {
// Error uploading file
$response = showAlert("danger", "Error Uploading the Image");
echo json_encode($response);
}
    } else {
        $response = showAlert("danger", "File is not an Image");
        echo json_encode($response);
    }

    

} else {

    $response = showAlert("warning", "Please Fill in all the Fields");
                
            
                echo json_encode($response);
    
        }