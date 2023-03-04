import { loadHeaderFooter, numberItems } from "./utils.mjs";
import { Admin } from "./Admin.mjs";

loadHeaderFooter();
numberItems("so-cart", ".numberCartItems");

let admin = new Admin("https://wdd330-backend.onrender.com/login", ".login");
admin.showLogin();
