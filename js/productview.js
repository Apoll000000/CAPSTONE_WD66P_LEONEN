function viewproduct(id) {
    let idRequest = { "id" : id}; 

    $.ajax({
        "url" : "php/viewproduct.php", //URL of the API
        "type" : "GET",
        "data" : "show=" + JSON.stringify(idRequest),
        "success" : function (response) {
            let parseResponse = JSON.parse(response);

            
            sessionStorage.setItem('productDetails', JSON.stringify(parseResponse.data[0]));

            // Redirect to another page
            window.location.href = "productViewing.html";
        },
        "error" : function (xhr, status, error) { //error yung response
            alert("Error")
        }
    });
}