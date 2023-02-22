import ProductListing from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, numberItems, getParam } from "./utils.mjs";
import { logProductCard } from "./QuickLook.mjs";
import {getCategoryFromUrl, getCategoryName} from "./breadcrumbs.js";

getCategoryFromUrl();
getCategoryName();
loadHeaderFooter();
numberItems("so-cart", ".numberCartItems");

const category = getParam("category");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductListing(category, dataSource, element);

logProductCard();

listing.init();
