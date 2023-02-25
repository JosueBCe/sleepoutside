import {
  loadHeaderFooter,
  numberItems,
  setLocalStorage,
  getLocalStorage,
} from "./utils.mjs";
import { newsLetterTemplate, responseToSubmission } from "./NewsLetter.mjs";
import { logProductCard } from "./QuickLook.mjs";

loadHeaderFooter();
numberItems("so-cart", ".numberCartItems");

/* Function that Renders the newsletter form and say "Thanks when submitted" */
newsLetterTemplate();
document
  .getElementById("submit-button")
  .addEventListener("click", responseToSubmission);

logProductCard();

/* Display the MODAL FORM in the first visit */
const modalFirstVisit = document.querySelector("#modalVisit");
const closeModalFirstVisit = document.querySelector(".closeFirstVisit");
const registerFirstVisit = document.querySelector("#register");

const firstVisit = getLocalStorage("first");

if (!firstVisit) {
  setLocalStorage("first", "no");
  modalFirstVisit.showModal();
}

closeModalFirstVisit.addEventListener("click", () => {
  modalFirstVisit.close();
});

// ---------------------------------
// ---------------------------------
// ADD LINK TO THE REGISTER FORM

registerFirstVisit.addEventListener("click", () => {
  // console.log("Register Form");
});
