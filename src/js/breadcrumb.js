import { getParam } from "./utils.mjs";

const product = getParam("product");
const category = getCategoryFromUrl();
const breadcrumbElement = document.querySelector(".breadcrumb");
let breadcrumbHtml = "";
if (category) {
  breadcrumbHtml += `<a href="/">Home</a> > <a href="/product-listing/index.html?category=${category}">${getCategoryName(
    category
  )}</a>`;
  if (product) {
    breadcrumbHtml += ` > ${product}`;
  }
} else {
  breadcrumbHtml += "Home";
}
breadcrumbElement.innerHTML = breadcrumbHtml;

export function getCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category");
}

export function getCategoryName(cat) {
  switch (cat) {
    case "tents":
      return "Tents";
    case "backpacks":
      return "Backpacks";
    case "sleeping-bags":
      return "Sleeping Bags";
    case "hammocks":
      return "Hammocks";
    default:
      return "";
  }
}
