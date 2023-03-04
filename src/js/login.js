import { loadHeaderFooter, numberItems } from "./utils.mjs";

loadHeaderFooter();
numberItems("so-cart", ".numberCartItems");

document.querySelector(".submitSingUp").addEventListener("click", messageIn);

function messageIn() {
  const nameUser = document.querySelector("#name").value;

  document.querySelector("#name").disabled = true;
  document.querySelector("#address").disabled = true;
  document.querySelector("#email").disabled = true;
  document.querySelector("#avatar").disabled = true;
  document.querySelector(".submitSingUp").style.display = "none";
  document.querySelector(".userMessage").style.display = "block";
  document.querySelector(".userMessage").textContent = `Thanks ${nameUser}! You are now a member of "Healthy Bites"`;
}
