export default class Test {
    constructor() {
      this.url = "../json/alert.json";
    }
  
    async fetchData() {
      const response = await fetch(this.url);
      if (response.ok) {
        let data = await response.json();




// assuming the product details are stored in a variable called `product`

if (product.colors.length > 1) {
    // if there are multiple color options, display swatches and allow the customer to choose a color
    let colorSwatches = document.createElement("div");
    colorSwatches.classList.add("color-swatches");
  
    product.colors.forEach(function(color) {
      let swatch = document.createElement('button');
      swatch.classList.add('color-swatch');
      swatch.style.backgroundColor = color.hexCode; // assuming hexCode is a property of the color object
  
      swatch.addEventListener('click', function() {
        // set the selected color
        product.selectedColor = color;
        updateProductDetails(); // function to update the product details based on the selected color
      });
  
      colorSwatches.appendChild(swatch);
    });
  
    // add the color swatches to the page
    let productDetails = document.getElementById('product-details'); // assuming there's an element with id 'product-details' on the page
    productDetails.appendChild(colorSwatches);
}