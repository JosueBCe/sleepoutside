import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    let final_price = Number(item.FinalPrice)
    let suggested_retail_price = Number(item.SuggestedRetailPrice)
    let discount = Math.abs(final_price - suggested_retail_price).toFixed(2)
    let quantity = Number(item.quantity)
    let total_discount = (discount * quantity).toFixed(2)
    let { Images, Name } = item
    let total_price = Number(final_price * quantity).toFixed(2)

    const newItem = `<li class='cart-card divider'>
                      <a href='#' class='cart-card__image'>
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
                      <a href='#'>
                        <h2 class='card__name'>${item.Name}</h2>
                      </a>
                      <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
                      <p class='cart-card__quantity'>Quantity: ${item.quantity}</p>
                      <p class='cart-card__price'>Unit Price: $${item.FinalPrice}</p>
                      <p class='cart-card__price'>Total: $${total_price}</p>
                      <p class='saved'>Saved: $${total_discount}<p>
                    </li>
                    `;
    return newItem;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }
    // renderCartContents() {
    //   const cartItems = getLocalStorage(this.key);
    //   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    //   document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    // }
    renderCartContents() {
      let total = 0;
      let saved = 0;
      const cartItems = JSON.parse(localStorage.getItem(this.cartName)) || [];
    
      // clear the list of products
      const productList = document.querySelector(this.productListSelector);
      productList.innerHTML = "";
    
      // iterate over each item in the cart and add it to the list of products
      for (let item of cartItems) {
        // calculate the price and savings for the item
        const price = item.Price * item.Quantity;
        const savings = item.Savings * item.Quantity;
    
        // create a new product card for the item
        const productCard = document.createElement("li");
        productCard.classList.add("cart-card");
    
        // fill in the product card with the item's information
        const cardImage = document.createElement("img");
        cardImage.classList.add("card__image");
        cardImage.src = item.Image;
        cardImage.alt = item.Name;
        productCard.appendChild(cardImage);
    
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card__info");
        productCard.appendChild(cardInfo);
    
        const cardName = document.createElement("h3");
        cardName.classList.add("card__name");
        cardName.textContent = item.Name;
        cardInfo.appendChild(cardName);
    
        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card__price");
        cardPrice.textContent = "$" + price.toFixed(2);
        cardInfo.appendChild(cardPrice);
    
        const cardQuantity = document.createElement("p");
        cardQuantity.classList.add("cart-card__quantity");
        cardQuantity.textContent = "Quantity: " + item.Quantity;
        cardInfo.appendChild(cardQuantity);
    
        const cardSavings = document.createElement("p");
        cardSavings.classList.add("cart-card__savings");
        cardSavings.textContent = "Saved: $" + savings.toFixed(2);
        cardInfo.appendChild(cardSavings);
    
        productList.appendChild(productCard);
    
        // add the price and savings for the item to the total and saved variables
        total += price;
        saved += savings;
      }
    
      // update the cart footer with the total and saved values
      const cartFooter = document.querySelector(".cart-footer");
      const cartTotal = cartFooter.querySelector(".cart-total");
      cartTotal.textContent = "Total: $" + total.toFixed(2);
      const cartSaved = cartFooter.querySelector(".cart-saved");
      cartSaved.textContent = "Saved: $" + saved.toFixed(2);
    
      // display the cart footer if there are items in the cart
      if (cartItems.length > 0) {
        cartFooter.classList.remove("hide");
      }
    }
    
}

export function sumTotal(cart) {
  let total = 0;
  cart.forEach(item => total += (item.FinalPrice * item.quantity));
  return total;
}
