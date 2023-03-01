class Admin {
  async login(email, password) {
    const response = await fetch("http://server-nodejs.cit.byui.edu:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return {
      email: data.email,
      password: data.password,
      isAdmin: true
    }
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
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const user = await this.login(email, password);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    });
    form.appendChild(submitButton);

    mainElement.appendChild(form);
  }
}

export default Admin;
