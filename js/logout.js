function logout() {
    $.ajax({
      url: "php/logout.php", // URL of the API that handles profile deletion
      type: "POST",
      success: function (response) {
        console.log(response);
        let parseResponse = JSON.parse(response);
        // Do certain process
        alert(parseResponse.message);
        setTimeout(function() {
            window.location.href = "index.html";
        }, 3000);

      },
      error: function (xhr, status, error) {
        alert("Error");
      },
    });
  }

  $(document).ready(function() {
    $("#logout").click(function() {
        logout();
    });
});