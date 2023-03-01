import { loadHeaderFooter } from "./utils.mjs";
import { Admin } from "./Admin.mjs";

loadHeaderFooter()

let admin = new Admin("https://wdd330-backend.onrender.com/login", ".login")

admin.showLogin()