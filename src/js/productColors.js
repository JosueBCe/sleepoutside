// Fetch data from JSON file
async function fetchData() {
  try {
    const response = await fetch("https://wdd330-backend.onrender.com/products/search/backpacks");
      const data = await response.json();
      return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function getProduct() {
  const products = await fetchData();
  console.log(products)
}

// get the product object
const products = getProduct();

// get the colors array
const colors = products.Colors;

// if the product has more than one color option
if (colors && colors.length > 1) {
  // create a container for the color swatches
  let swatchContainer = document.createElement("div");
  swatchContainer.classList.add("color-swatches");
  
  // iterate over the colors array
  colors.forEach(color => {
    // create a button for the color swatch
    let swatch = document.createElement("button");
    swatch.classList.add("color-swatch");
    swatch.textContent = color.ColorName;
    swatch.style.backgroundColor = `products/search/backpacks/(${color.ColorChipImageSrc})`; // https://wdd330-backend.onrender.com/products/search/backpacks
  
    // add event listener to the swatch button
    swatch.addEventListener("click", function() {
      // set the selected color
      selectedColor = color;
      // update the selected swatch to show it's selected. 
      const selectedSwatch = document.querySelector(".color-swatch.selected");
      // ensures that only one color swatch can be selected at a time
      if (selectedSwatch) {
        selectedSwatch.classList.remove('selected');
      }
      swatch.classList.add('selected');
    });
    
      // add the swatch button to the container
      swatchContainer.appendChild(swatch);
    });
  
     // append the swatch container to the product details page
    let productDetails = document.querySelector(".product-detail"); // assuming there's an element with id 'product-details' on the page
    productDetails.appendChild(swatchContainer);
}