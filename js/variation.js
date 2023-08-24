let variationCount = 0;
function addVariation() {
    variationCount++;
    const variationsDiv = document.getElementById("variations");
    const variationInput = document.createElement("div");
    variationInput.classList.add("mb-2");
    variationInput.innerHTML = `
        <input type="text" class="form-control" id="varname" name="variation${variationCount}" placeholder="Variation ${variationCount} Name">
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
        <input type="text" id="sizname" class="form-control" name="sizes${sizesCount}" placeholder="Sizes ${sizesCount} Name">
        <button type="button" class="btn btn-danger btn-sm" onclick="removeSize(this)">Remove</button>
    `;
    sizesDiv.appendChild(sizesInput);
}

function removeSize(button) {
    const sizesDiv = button.parentElement;
    sizesDiv.remove();
}
