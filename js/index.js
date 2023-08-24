
index();
function index() {
    $.ajax({
        "url": "php/indexLogged.php", //URL of the API
        "type": "GET", //GET request
        "data": "index", // Set the "index" parameter to true
        "success": function(response) { //success yung response
            console.log("Response:", response); // Check the response in the console
            let parseResponse = JSON.parse(response);
            //Do certain process

            let contents = parseResponse.data;
            let cards = "";
            for (let i = 0; i < contents.length; i++) {
                let id = contents[i].prod_id;
                let imageSrc = contents[i].productImage;

                cards += 
                    '<div class="product">' +
                        '<div class="product-box">' +
                            '<img src="php/' + imageSrc + '">' +
                        '</div>' +
                                '<div class="product-buttons">' +
                                    '<div class="button-holder">' +
                                        '<center>'+
                                        '<img src="assets/eye.png">' +
                                        '</center>' +
                                    '</div>' +

                                    '<div class="button-holder">' +
                                        '<center>' +
                                        '<img src="assets/shopping-bag.png">' +
                                        '</center>' +
                                    '</div>' +
                                '</div>' +
                        '<div class="product-info">' +
                            '<p class="product-title">' + contents[i].productName + '</p>' + 
                            '<p class="price">Php' + contents[i].productPrice + '</p>' + 
                        '</div>' +
                    '</div>'

            }

            $("#container-prod").html(cards);

        },
        "error": function(xhr, status, error) { //error yung response
            alert("Error");
        }
    });
}

function login () {
    let loginRequest = {
        "username" : $("#username").val(),
        "password" : $("#password").val()
    }

    $.ajax({
        "url" : "php/login.php", //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "auth=" + JSON.stringify(loginRequest), //auth will be our php variable $_POST['auth']
        //JS JSON.stringify -> PHP json_decode
        //PHP json_encode -> JSON.parse
        //5. Check your API and do the process
        "success" : function (response) { //success yung response
            /**
             * 6. Check the response and parse it thru JSON.parse
             */
            let parseResponse = JSON.parse(response);
            $("#logcon").html("");
            $("#logcon").html('<div class="alert alert-' + parseResponse.alertType + '" role="alert">' + parseResponse.message + '</div>');

            /**
             * If successful yung login
             */
            if (parseResponse.alertType == "success") {
                window.location.href = "indexLogged.html";
            }
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
 }

 function register() {
    let registrationRequest = {
        "fname" : $("#firstName").val(),
        "lname" : $("#lastName").val(),
        "password" : $("#registerpassword").val(),
        "username" : $("#email").val(),
        "extName" : $("#extName").val(),
        "confirmPassword" : $("#confirmpassword").val(),
        "barangay" : $("#barangay").val(),
        "city" : $("#city").val(),
        "province" : $("#province").val(),
        "zipCode" : $("#zipCode").val(),
        "birthday" : $("#birthday").val()
    }

    $.ajax({
        "url" : "php/register.php", //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "register=" + JSON.stringify(registrationRequest), //auth will be our php variable $_POST['auth']
        //JS JSON.stringify -> PHP json_decode
        //PHP json_encode -> JSON.parse
        //5. Check your API and do the process
        "success" : function (response) { //success yung response
            /**
             * 6. Check the response and parse it thru JSON.parse
             */
            let parseResponse = JSON.parse(response);
            $("#regcon").html('<div class="alert alert-' + parseResponse.alertType + '" role="alert">' + parseResponse.message + '</div>');
            
            if (parseResponse.alertType === "success") {       
                setTimeout(function() {
                    $("#regcon").html("");
                    window.location.reload();
                }, 3000);
            } 
             else {
                setTimeout(function() {
                    $("#regcon").html("");
                    window.location.reload();
                }, 3000);
            }


        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error");
            window.location.reload();
        }
    });
}