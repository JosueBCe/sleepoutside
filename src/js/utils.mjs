// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);  //data to html
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// To load templates.
export function renderWithTemplate(
  template,
  parentElement, // <main>, <footer>, <ul>, <div>, etc.
  data,
  position = "afterbegin",
  callback // Insert template at the beginning of the parent element
) {
  parentElement.insertAdjacentHTML(position, template);
  // If the callback exists then call it.
  if (callback) {
    callback(data);
  }
}

// Make a fetch request to the provided path, then process the response as text. 
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = response.text();
  return template
}

// Function to load header & footer template
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header") // Grab the header element out of the DOM
  const footerElement = document.querySelector("#main-footer") // Grab the footer element out of the DOM

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

//Function to display the number of items in the Backpack Icon
export function numberItems(key, outputSelector = null) {
  const cart = getLocalStorage(key) || [];
  
  let total = 0;
  cart.forEach(item => total += item.quantity);

  if (outputSelector) {
    let numTotal = document.querySelector(outputSelector);
    if (!isNaN(total)) {
      numTotal.innerHTML += total;
    }
  }
  
  return total;
}

export function calculateShippingCost(numItems) {
  // If there's only one item, the shipping cost is $10
  if (numItems === 1) {
    return 10;
  }
  
  // For each additional item, add $2 to the shipping cost
  return 10 + (2 * (numItems - 1));
}

// Delete local storage after checkout
export function deleteLocalStorageItem(key) {
  localStorage.removeItem(key);
}

export async function alertMessage(message, scroll = true, duration = 9300) {
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<div class="alertError"><p class="messageError">${message}</p><button id="buttonError">&#10006;</button></div>`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
      if(e.target.tagName == "BUTTON") { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  });
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll) window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}