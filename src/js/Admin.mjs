export default class Admin {
  async login(email, password) {
    const response = await fetch("http://server-nodejs.cit.byui.edu:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
  
    if (response.status === 401) {
      throw new Error("Invalid credentials");
    }
  
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
  
    const data = await response.json();
  
    return {
      email: data.email,
      password: data.password,
      isAdmin: true
    }
  }
  async showLogin(email,password){
    const response = await fetch("http://server-nodejs.cit.byui.edu:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
  
    if (response.status === 401) {
      throw new Error("Invalid credentials");
    }
  
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
  
    const data = await response.json();
  
    return {
      email: data.email,
      password: data.password,
      isAdmin: true
    }
  }
};
