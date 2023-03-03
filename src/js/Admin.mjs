import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export class Admin {
    constructor(apiUrl, outputSelector) {
      this.apiUrl = apiUrl;
      this.token = null;
      this.mainElement = document.querySelector(outputSelector);
      this.services = new ExternalServices();
    }
  
    async login(email, password) {
    try {
        this.token = await this.services.loginRequest(email, password, this.apiUrl);
        // next(); ASK BROTHER ABOUT THE ERROR OF THIS BUILT IN FUNCTION
      } 
      catch(err) {
        // remember this from before?
        alertMessage(err.message);
      }
    }
  
    showLogin() {
      // build the login form in the main element
      const form = `
        <form class="login-form">
          <label>Email:</label>
          <input type="email" name="email" value="user1@email.com"><br>
          <label>Password:</label>
          <input type="password" name="password" value="user1"><br>
          <input type="submit" value="Login">
        </form>
      `;
  
      // add the form to the main element of the page
      const mainElement = document.querySelector(".login");
      mainElement.innerHTML = form;
  
      // add event listener to submit button
      const submitButton = document.querySelector("input[type='submit']");
      submitButton.addEventListener("click", async (event) => {
        // prevent default form submission behavior
        event.preventDefault();
  
        // get input values
        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;
  
        // call login method
        await this.login(email, password);
        await this.consoleData()
      });
    }
    consoleData(){
        console.log(this.services.getOrders(this.token))
    }
  }
  