import { getLocalStorage } from "./utils.mjs";
import { sumTotal } from "./ShoppingCart.mjs";
import addToWishlist from "./ProductDetails.mjs";
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
        const htmlItems = wishlistItems.map((item) => wishlistItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        if (wishlistTotal !== null){
          wishlistTotal.style.display = "block"; // Make appear the total paragraph that is hidden by default
          wishlistTotal.innerHTML = `Total: $${sumTotal(wishlistItems).toFixed(2)}`;

          // Add event listeners to wishlist buttons
          const wishlistButtons = document.querySelectorAll(".wishlist-button");
          wishlistButtons.forEach(button => {
            button.addEventListener("click", () => {
              const itemId = button.dataset.id;
              addToWishlist(itemId);
            });
          });
        }
      }
    }
  }
}


function wishlistItemTemplate(item) {
  let final_price = Number(item.FinalPrice);
  let suggested_retail_price = Number(item.SuggestedRetailPrice);
  let discount = Math.abs(final_price - suggested_retail_price).toFixed(2);
  let quantity = Number(item.quantity);
  let total_discount = (discount * quantity).toFixed(2);
  let { Images, Name } = item;
  let total_price = Number(final_price * quantity).toFixed(2);

  // Check if the quantity, total_discount, and total_price are valid numbers before displaying them
  if (isNaN(quantity)) quantity = 0;
  if (isNaN(total_discount)) total_discount = 0;
  if (isNaN(total_price)) total_price = 0;

  const newItem = `<li class="cart-card divider">
                    <a href="#" class="cart-card__image">
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
                    <a href="#">
                      <h2 class="card__name">${item.Name}</h2>
                    </a>
                  </li>
                  `;
  return newItem;
}

