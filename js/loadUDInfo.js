$(document).ready(function() {
    $.ajax({
        url: "php/loadUDInfo.php",
        type: "POST",
        success: function(response) {
            let user = JSON.parse(response);
            if (user.error) {
                console.log(user.error);
            } else {
                $("#firstname").val(user.fname);
                $("#lastname").val(user.lname);
                $("#extname").val(user.extname);
                $("#zipcode").val(user.zipcode);
                $("#barangay").val(user.barangay);
                $("#city").val(user.city);
                $("#province").val(user.province);
                $("#birthday").val(user.birthday);
                $("#email").val(user.email);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        }
    });
});