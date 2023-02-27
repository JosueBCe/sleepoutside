import { getLocalStorage, setLocalStorage, numberItems } from "./utils.mjs";
import Alert from "./alert.js";

function productDetailsTemplate(product) {
  let final_price = Number(product.FinalPrice)
  let suggested_retail_price = Number(product.SuggestedRetailPrice)
  let discount = Math.abs(final_price - suggested_retail_price).toFixed(2)

  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
          <h2 class="divider">${product.NameWithoutBrand}</h2>
          <img
            class="divider"
            src="${product.Images.PrimaryLarge}"
            alt="${product.NameWithoutBrand}"
          />
          <p class="product-card__price">Now! $${final_price}</p>
          <p class="product-card__retail_price">Before: $${suggested_retail_price}</p>
          <p class="product-card__description saved">You're Saving $${discount}</p>
          <p class="product__color">${product.Colors[0].ColorName}</p>
          <p class="product__description">
          ${product.DescriptionHtmlSimple}
          </p>
          <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add To Cart</button>
            <button id="addToWishlist" data-id="${product.Id}">Add To Wishlist</button>
            <div id="snackbar">1 item added to cart</div>
          </div>
          </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  renderWishlistItems(selector) {
    const element = document.querySelector(selector);
    const wishlistItems = getLocalStorage("so-wishlist");
    if (wishlistItems) {
      wishlistItems.forEach((product) => {
        element.insertAdjacentHTML("beforeend", productDetailsTemplate(product));
      });
    }
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // this will be exclusive for the wishlist items
    this.renderWishlistItems(".product-list");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
    
    document
     .getElementById("addToWishlist")
     .addEventListener("click", this.addToWishlist.bind(this));
  }
  addToCart() {
    
    numberItems("so-cart", ".numberCartItems");

    // The cart will shake to indicate something has been added to the cart
    document.querySelector(".rise-shake").style.animation = "jump-shaking 0.85s";

    showSnackBar();

    setTimeout(function () {
      window.location.reload();
    }, 1500); 

    

    let Data = getLocalStorage("so-cart");
    if (Data) {
      let tent = 1;
      for (let i = 0; i < Data.length; i++) {
        if (Data[i].Id == this.product.Id) {
          this.product.quantity = Data[i].quantity++;
          tent = 0;
        }
      }

      if (tent == 1) {
        this.product.quantity = 1;
        Data.push(this.product);
      }
      
    } else {
      Data = [];
      this.product.quantity = 1;
      Data.push(this.product);
    }
    setLocalStorage("so-cart", Data);

    
  }


  addToWishlist() {
    let Data = getLocalStorage("so-wishlist");
    if (!Data) {
      Data = [];
    }

    let tent = 1;
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].Id == this.product.Id) {
        tent = 0;
        break;
      }
    }

    if (tent == 1) {
      Data.push(this.product);
      setLocalStorage("so-wishlist", Data);
      showSnackBar("1 item added to wishlist");
    } else {
      showSnackBar("Item already in wishlist");
    }
  }


  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

function showSnackBar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.classList.add("show");
  const alert = new Alert();
  alert.fetchData();
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 1500);
}
  