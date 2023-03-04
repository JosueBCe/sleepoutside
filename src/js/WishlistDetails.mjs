import { getLocalStorage,setLocalStorage } from "./utils.mjs";
import { sumTotal } from "./ShoppingCart.mjs";
import { showSnackBar } from "./ProductDetails.mjs";
export default class WishlistDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderWishlistItem("main");
    document
     .getElementById("addCart")
     .addEventListener("click", this.addToWishlist.bind(this));
  }
  async addToWishlist() {
    
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
}
