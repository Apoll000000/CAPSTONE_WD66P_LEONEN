

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
                                        '<img onclick="viewproduct(' + id + ')" src="assets/eye.png">' +
                                        '</center>' +
                                    '</div>' +

                                    '<div class="button-holder">' +
                                        '<center>' +
                                        '<img onclick="addtocart(' + id + ')" src="assets/shopping-bag.png">' +
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

