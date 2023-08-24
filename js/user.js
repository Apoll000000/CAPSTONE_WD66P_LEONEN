$(document).ready(function() {
    $.ajax({
        url: "php/user.php",
        type: "GET",
        success: function(response) {
            let user = JSON.parse(response);
            if (user.error) {
                console.log(user.error);
            } else {
                $("#namee").text(user.fname + " " + user.lname + " " + user.extname);
                $("#em").text(user.email);
                $("#ad").text(user.zipcode + "," + " " + user.barangay + "," + " " + user.city + "," + " " + user.province);
                if (user.profilepicture !== '') {
                  $("#profpic").attr("src", "php/" + user.profilepicture);
                } else {
                  $("#profpic").attr("src", "assets/user (1).png");
                }
            }
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        }
    });
});

$("#file-input").on("change", function() {
    // Get the selected file
    let profile = $("#file-input")[0].files[0];
  
    // Create a FormData object to send the file data
    let formData = new FormData();
    formData.append("profile", profile);
  
    // Make the AJAX request
    $.ajax({
      url: "php/profilepic.php", // Replace with the URL of your PHP script to handle the file upload
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        // Handle the server response here
        let parseResponse = JSON.parse(response);
        $("#containeralert").html('<div class="alert alert-' + parseResponse.alertType + '" role="alert">' + parseResponse.message + '</div>');
            if (parseResponse.alertType == "success") {
                setTimeout(function() {
                    $("#containeralert").html("");
                    window.location.reload();
                }, 2000);
            } else if (parseResponse.alertType == "warning") {
                setTimeout(function() {
                    $("#containeralert").html("");
                    window.location.reload();
                }, 2000);
            } else {
                setTimeout(function() {
                    $("#containeralert").html("");
                    window.location.reload();
                }, 2000);
            }
        

      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });

  function updateProfile() {
    // Gather the updated profile data from the form fields or any other source
    let updatedProfileData = {
        "fname": $("#firstname").val(),
        "lname": $("#lastname").val(),
        "extname" : $("#extname").val(),
        "birthday" : $("#birthday").val(),
        "barangay" : $("#barangay").val(),
        "city" : $("#city").val(),
        "province" : $("#province").val(),
        "zipcode" : $("#zipcode").val(),
        "email" : $("#email").val(),
        "password" : $("#password").val(),
        "confirmpassword" : $("#confirmPassword").val()   
    };

    // Send the AJAX request to updateProfile.php
    $.ajax({
        url: "php/updateProf.php",
        type: "POST",
        data: "updateProfile=" + JSON.stringify(updatedProfileData),
        success: function(response) {
            let parseResponse = JSON.parse(response);
            $("#UDcont").html('<div class="alert alert-' + parseResponse.alertType + '" role="alert">' + parseResponse.message + '</div>');
            if (parseResponse.alertType == "success") {
                setTimeout(function() {
                    $("#UDcont").html("");
                    window.location.reload();
                }, 2000);
            } else {
                setTimeout(function() {
                    $("#UDcont").html("");
                    window.location.reload();
                }, 2000);
            }

        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        }
    });
}