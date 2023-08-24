const backToTopBtn = document.getElementById("backToTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

backToTopBtn.addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

const fileInput = document.getElementById('file-input');
        fileInput.addEventListener('change', function (event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
            const profileImage = document.querySelector('.profile-image');
            profileImage.src = URL.createObjectURL(selectedFile);
            }
        });

const images = document.querySelectorAll('.ordstats');
    images.forEach((image) => {
    image.addEventListener('click', () => {
        const isHighlighted = image.classList.contains('highlighted');
        images.forEach((img) => img.classList.remove('highlighted'));
            if (!isHighlighted) {
                image.classList.add('highlighted');
            }
        });
    });


    let variationCount = 0;
    function addVariation() {
        variationCount++;
        const variationsDiv = document.getElementById("variations");
        const variationInput = document.createElement("div");
        variationInput.classList.add("mb-2");
        variationInput.innerHTML = `
            <input type="text" class="form-control" name="variation${variationCount}" placeholder="Variation ${variationCount} Name">
            <button type="button" class="btn btn-danger btn-sm" onclick="removeVariation(this)">Remove</button>
        `;
        variationsDiv.appendChild(variationInput);
    }
    
    function removeVariation(button) {
        const variationDiv = button.parentElement;
        variationDiv.remove();
    }
    
    
    let sizesCount = 0;
    function addSizes() {
        sizesCount++;
        const sizesDiv = document.getElementById("sizes");
        const sizesInput = document.createElement("div");
        sizesInput.classList.add("mb-2");
        sizesInput.innerHTML = `
            <input type="text" class="form-control" name="sizes${sizesCount}" placeholder="Sizes ${sizesCount} Name">
            <button type="button" class="btn btn-danger btn-sm" onclick="removeSize(this)">Remove</button>
        `;
        sizesDiv.appendChild(sizesInput);
    }
    
    function removeSize(button) {
        const sizesDiv = button.parentElement;
        sizesDiv.remove();
    }


    function selectVariation(element) {
        const variations = document.querySelectorAll('.variation');
        variations.forEach(variation => {
            variation.classList.remove('selected');
        });

        element.classList.add('selected');

        const selectedVariation = element.getAttribute('data-variation');

        console.log('Selected Variation:', selectedVariation);
    }

    function selectSize(element) {
        const sizes = document.querySelectorAll('.size');
        sizes.forEach(size => {
            size.classList.remove('selected');
        });

        element.classList.add('selected');

        const selectedSize = element.getAttribute('data-size');

        console.log('Selected Size:', selectedSize);
    }

        function showMore() {
            const description = document.querySelector(".product-description");
            const button = document.querySelector(".show-more-button");

            if (description.style.maxHeight === "200px" || description.style.maxHeight === "") {
                description.style.maxHeight = "none";
                button.textContent = "See Less";
            } else {
                description.style.maxHeight = "200px";
                button.textContent = "See More";
            }
        }

        window.onload = function () {
            const description = document.querySelector(".product-description");
            const button = document.querySelector(".show-more-button");

            if (description.scrollHeight > 200) {
                button.style.display = "block";
            }
        };

        function increment() {
            const input = document.getElementById("quantity");
            if (parseInt(input.value)) {
                input.value = parseInt(input.value) + 1;
            } else {
                input.value = 1;
            }
        }

        function decrement() {
            const input = document.getElementById("quantity");
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            } else {
                input.value = 1;
            }
        }
