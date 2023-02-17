import ProductListing from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, numberItems, getParam } from "./utils.mjs";
import { logProductCard } from "./QuickLook.mjs";

loadHeaderFooter();
numberItems("so-cart", ".numberCartItems");

const category = getParam("category");
const product = getParam("product");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductListing(category, dataSource, element);

logProductCard();

listing.init();

// Create the breadcrumb navigation
const breadcrumbElement = document.querySelector(".breadcrumb");
let breadcrumbHtml = "";
if (category) {
  breadcrumbHtml += `<a href="/">Home</a> > <a href="/?category=${category}">${category}</a>`;
  if (product) {
    breadcrumbHtml += ` > ${product}`;
  }
} else {
  breadcrumbHtml += "Home";
}
breadcrumbElement.innerHTML = breadcrumbHtml;
