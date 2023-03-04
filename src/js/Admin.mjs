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

      const form = `<form class="logInUp">
                      <fieldset>
                        <legend>Personal Information</legend>

                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="user1@email.com" required><br>

                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" value="user1" required><br>
                        
                        <button class="loginButton" type="submit" value="Login">Login</button>
                      </fieldset>
                    </form>`;

      // add the form to the main element of the page
      this.mainElement.innerHTML = form;
  
      // add event listener to submit button
      const submitButton = document.querySelector("button[type='submit']");
      submitButton.addEventListener("click", async (event) => {
        // prevent default form submission behavior
        event.preventDefault();
  
        // get input values
        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;
  
        // call login method
        await this.login(email, password);
        this.consoleData();
      });
    }
    
    async consoleData(){
      try {
        const orders = await this.services.getOrders(this.token);
        // console.log(orders);

        this.mainElement.innerHTML = orderTemplate();
        const parent = document.querySelector("#orders tbody");


        parent.innerHTML = orders
          .map(
            (order) =>
              `<tr class="listOrders">
                  <td>${order.id}</td>
                  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
                  <td>${order.items.length}</td>
                  <td>$ ${order.orderTotal}</td>
              </tr>`
          )
        .join("");
      } catch (err) {
        console.log(err);
      }
    }
  }
  
  // test
  function orderTemplate() {
    return `<h2 class="currentOrder">Current Orders</h2>

            <table id="orders">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>#Items</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody class="order-body"></tbody>
            </table>`;
  }