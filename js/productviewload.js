let productDetails = JSON.parse(sessionStorage.getItem('productDetails'));

        $("#describe").text(productDetails.productDescription);
        $(".stock-number").text(productDetails.productStock);
        $("#prodname").text(productDetails.productName);
        $("#price").text(productDetails.productPrice);
        $("#prodimg").attr("src", "php/" + productDetails.productImage);

        function addtocart() {
                const productDetails = JSON.parse(sessionStorage.getItem('productDetails'));
                let productQty = $("#quantity").val();
            
                const cartData = {
                    "productId": productDetails.prod_id,
                    "productStock": productDetails.productStock,
                    "productName": productDetails.productName,
                    "productPrice": productDetails.productPrice,
                    "productImage": productDetails.productImage,
                    "productQty": productQty
                }
            

                $.ajax({
                    "url" : "php/addtocart.php", //URL of the API
                    "type" : "POST", //GET and POST 
                    "data" : "cartData=" + JSON.stringify(cartData),
                    "success" : function (response) { //success yung response
                        $('#successcartModal').modal('show');
                        window.location.reload();
                    },
                    "error" : function (xhr, status, error) { //error yung response
                        alert("Error")
                    }
                });
            }