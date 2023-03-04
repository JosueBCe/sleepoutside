import { getLocalStorage } from "./utils.mjs";
import { sumTotal } from "./ShoppingCart.mjs";

export default class ShoppingWishCart{
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderWishlistContents(){
    const wishlistItems = getLocalStorage(this.key) || [];
    let wishlistTotal = document.querySelector(".wishlist-total");
    if (wishlistTotal !== 0) { // Check if wishlistTotal is not null
      if (wishlistItems.length != 0) {
        const htmlItems = wishlistItems.map((product) => wishlistItemTemplate(product));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        if (wishlistTotal !== null){
          wishlistTotal.style.display = "block"; // Make appear the total paragraph that is hidden by default
        wishlistTotal.innerHTML = `Total: $${sumTotal(wishlistItems).toFixed(2)}`
        }
      }
    }
  }
}

function wishlistItemTemplate(product) {
  let final_price = Number(product.FinalPrice);
  let suggested_retail_price = Number(product.SuggestedRetailPrice);
  let discount = Math.abs(final_price - suggested_retail_price).toFixed(2);
  let quantity = Number(product.quantity);
  let total_discount = (discount * quantity).toFixed(2);
  let { Images, Name } = product;
  let total_price = Number(final_price * quantity).toFixed(2);

  // Check if the quantity, total_discount, and total_price are valid numbers before displaying them
  if (isNaN(quantity)) quantity = 0;
  if (isNaN(total_discount)) total_discount = 0;
  if (isNaN(total_price)) total_price = 0;

  const newItem = `<li class="wishlist-cart-card divider">
                    <a href="#" class="wishlist-cart-card__image">
                    <img
                      src="${Images.PrimaryMedium}"
                      srcset="${Images.PrimarySmall} 350w,
                              ${Images.PrimaryMedium} 850w,
                              ${Images.PrimaryLarge} 1350w,
                              ${Images.PrimaryExtraLarge} 1900w"
                      sizes="(max-width: 350px) 320px,
                            (max-width: 850px) 768px,
                            (max-width: 1350px) 1200px,
                            1900px"
                      alt="Image of ${Name}"
                    />
                    </a>
                    
                    <a>
                      <h2 class="wishlist-card__name">${product.Name}</h2>
                      <button class="add_to_wishcart" data-product="${product.Id}">Add to Cart</button>
                      
                    </a>
                    
                  </li>
                  `;
    return newItem;
}


