// Admin.mjs

class Admin {
  login(email, password) {
    // Logic for logging in
  }

  showLogin() {
    const mainElement = document.querySelector("main");
    const form = document.createElement("form");

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Email";
    form.appendChild(emailInput);

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    form.appendChild(passwordInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;
      this.login(email, password);
    });
    form.appendChild(submitButton);

    mainElement.appendChild(form);
  }
}

export default Admin;
