import { getParam, loadHeaderFooter, numberItems } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
numberItems("so-cart", ".numberCartItems");

const productId = getParam("product");
const dataSource = new ExternalServices("tents");
const product = new ProductDetails(productId, dataSource);

product.init();
function addToWishList() {
  const wishList = JSON.parse(localStorage.getItem("wishList")) || [];

  if (!wishList.includes(productId)) {
    wishList.push(productId);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    alert("Added to Wish List!");
  } else {
    const index = wishList.indexOf(productId);
    wishList.splice(index, 1);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    alert("Removed from Wish List.");
  }
}
const addToWishListBtn = document.getElementById("add-to-wishlist-btn");
addToWishListBtn.addEventListener("click", addToWishList);


const moveToWishListBtns = document.querySelectorAll(".move-to-wishlist-btn");
moveToWishListBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    const index = cartItems.findIndex(items => items.id === productId);
    const itemList = cartItems[index];
    cartItems.splice(index, 1);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    if (!wishList.includes(productId)) {
      wishList.push(productId);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      alert("Added to Wish List!");
    }
    numberItems("so-cart", ".numberCartItems");
    itemList();
  });
});

// console.log(dataSource.findProductById(productId));

// function addProductToCart(product) {
//   let cart = getLocalStorage("so-cart");
//   if (cart) {
//     let tent = 1;
//     for (let i = 0; i < cart.length; i++) {
//       if (cart[i].Id == product.Id) {
//         product.quantity = cart[i].quantity++;
//         tent = 0;
//       }
//     }

//     if (tent == 1) {
//       product.quantity = 1;
//       cart.push(product);
//     }
//   } else {
//     cart = [];
//     product.quantity = 1;
//     cart.push(product);
//   }

//   setLocalStorage("so-cart", cart);
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
