export default class Alert {
  constructor() {
    this.url = "../json/alert.json";
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (response.ok) {
      let data = await response.json();
      document.querySelector("#snackbar").textContent = data[0].message;
      let div = document.querySelector("#snackbar");
      div.className = "show";
      div.style.background = data[0].background;
      div.style.color = data[0].color;
      setTimeout(function () {
        div.className = div.className.replace("show", "");
      }, 3000); // After 3 seconds, remove the show class from DIV
      // window.location.reload();
    }
  }
}
