index();
function index() {
    $.ajax({
        "url": "php/sellerDB.php", //URL of the API
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
                    '<div class="product-info">' +
                        '<div class="collapseimg-holder1">' +
                            '<img class="collapseimg" src="php/' + imageSrc + '">' +
                        '</div>' +
                        '<p class="collapseprodname1">' + contents[i].productName + '</p>' +
                        '<div class="collapseprodqty1">Stocks:<p>' + contents[i].productStock + '</p></div>' +
                        '<div class=cancel1>' +
                            '<button onclick="editProduct(' + id + ')" class="inner-button">Edit</button>' +
                            '<button onclick="destroy(' + id + ')" class="inner-button">Delete</button>' +
                        '</div>' +
                    '</div>'
                    

            }

            $("#existingproducts1").html(cards);

        },
        "error": function(xhr, status, error) { //error yung response
            alert("Error");
        }
    });
}

function addproduct() {
    let productName = $("#productName").val();
    let productPrice = $("#productPrice").val();
    let productCategory = $("#category").val();
    let productStock = $("#productStock").val();
    let productDescription = $("#productDescription").val();
    let productImage = $("#productImage")[0].files[0];

    let variations = [];
    let sizes = [];

    // Iterate through variation input fields
    $('#varname').each(function () {
        variations.push($(this).val());
    });

    // Iterate through sizes input fields
    $('#sizname').each(function () {
        sizes.push($(this).val());
    });

    let formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productCategory', productCategory);
    formData.append('productStock', productStock);
    formData.append('productDescription', productDescription);
    formData.append('productImage', productImage);
    formData.append('variations', JSON.stringify(variations));
    formData.append('sizes', JSON.stringify(sizes));

    

    $.ajax({
        url: "php/addproduct.php",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            let parseResponse = JSON.parse(response);
            // Handle the response from the PHP file
            if (parseResponse.alertType == "success") {
                $("#container").html('<div class="alert alert-' + parseResponse.alertType + '" role="alert">' + parseResponse.message + '</div>');
                    setTimeout(function() {
                    $("#container").html("");
                    window.location.href = "sellerDB.html";
                }, 3000); index();
            } else if (parseResponse.alertType == "warning") {
                $("#container").html('<div class="alert alert-' + parseResponse.alertType + '" role="alert">' + parseResponse.message + '</div>');
                setTimeout(function() {
                    $("#container").html("");
                    
                }, 3000); index();
            } else {
                $("#container").html('<div class="alert alert-' + parseResponse.alertType + '" role="alert">' + parseResponse.message + '</div>');
                setTimeout(function() {
                    $("#container").html("");
                    window.location.href = "sellerDB.html";
                }, 3000); index();
            }
        },
        error: function(xhr, status, error) {
            alert("Error");
            window.location.reload();
        }
    });
}


function destroy(id) {


    let idRequest = { "id" : id }; //$("#id").val() <- dito naka lagay yung specific id

    $.ajax({
        "url" : "php/deleteproduct.php", //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "destroy=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
            alert(parseResponse.message);
            setTimeout(function() {
                window.location.href = "sellerDB.html";
            }, 1000);

        
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}