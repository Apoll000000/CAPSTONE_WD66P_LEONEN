index();
function index() {
    $.ajax({
        "url": "php/loadcart.php", //URL of the API
        "type": "GET", //GET request
        "data": "index", // Set the "index" parameter to true
        "success": function(response) { //success yung response
            console.log("Response:", response); // Check the response in the console
            let parseResponse = JSON.parse(response);
            //Do certain process

            let contents = parseResponse.data;
            let cards = "";
            for (let i = 0; i < contents.length; i++) {
                let id = contents[i].cart_id;
                let prodid = contents[i].prod_id;
                let imageSrc = contents[i].productImage;

                cards += 
                
                    '<div class="product-cart">' +
                    '<input type="checkbox" class="checkbox" value="' + id + '">' +
                        '<div class="collapseimg-holderr"><img class="collapseimgg" src="php/' + imageSrc + '"></div>' +
                        '<div class="twonone">' +
                            '<p class="collapseprodnames">' + contents[i].productName + '</p>' +
                            '<p class="collapseprodvars">asdasdasd</p>' +
                        '</div>' +
                            '<div class="collapseprodqtyy">' +
                            '<p class="price prc" data-price="' + contents[i].productPrice + '">P' + contents[i].productPrice + '</p>' +
                            '<p class="qty" data-quantity="' + contents[i].quantity + '">Qty:' + contents[i].quantity + '</p>' +
                            '</div>' +
                        '<button class="cancelled" onclick="trash(' + id + ')">Delete</button>' +
                    '</div>' 

            }

            $(".offcanvas-body").html(cards);

        },
        "error": function(xhr, status, error) { //error yung response
            alert("Error");
        }
    });
}

function trash(id) {


    let idRequest = { "id" : id }; //$("#id").val() <- dito naka lagay yung specific id

    $.ajax({
        "url" : "php/deletecartitem.php", //URL of the API
        "type" : "POST", //GET and POST 
        "data" : "destroy=" + JSON.stringify(idRequest), //auth will be our php variable $_POST['auth']
        "success" : function (response) { //success yung response
            console.log(response)
            let parseResponse = JSON.parse(response);
            //Do certain process
            alert(parseResponse.message);
            setTimeout(function() {
                window.location.reload();
            }, 1000);

        
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}

function getSelectedItemsData() {
    var selectedItems = [];

    $(".checkbox:checked").each(function () {
        var checkbox = $(this);
        var productHolder = checkbox.closest(".product-cart");

        var cartId = checkbox.val();
        var productPrice = parseFloat(productHolder.find(".price").data("price"));
        var productQty = parseInt(productHolder.find(".qty").data("quantity"));

        var productObj = {
            "cart_id": cartId,
            "product_price": productPrice,
            "product_quantity": productQty
        };

        selectedItems.push(productObj);
    });

    return selectedItems;
}

function checkout() {
    var selectedItems = getSelectedItemsData();
    var totalAmount = 0;

    for (var i = 0; i < selectedItems.length; i++) {
        var totalPrice = selectedItems[i].product_price * selectedItems[i].product_quantity;
        totalAmount += totalPrice;
    }
    

    console.log("Total Amount: " + totalAmount);


   
    var checkoutData = {
        "selectedItems": selectedItems,
        "totalAmount": totalAmount
    };

   
    $.ajax({
        url: "php/checkout.php", 
        method: "POST",
        data: JSON.stringify(checkoutData),
        contentType: "application/json",
        success: function (response) {

            console.log(response);
 
        },
        error: function (error) {
            console.error("Error during checkout:", error);

        }
    });
}
