import alerts from "../public/json/alert.json";

export default class Alert {
  constructor() {
    this.alerts = alerts;
    this.createAlertsSection();
  }

  createAlertsSection() {
    const section = document.createElement("section");
    section.classList.add("alert-list");
    this.alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });
    const main = document.querySelector("main");
    main.insertBefore(section, main.firstChild);
  }
}

// export default class Alert {
//     constructor() {
//         fetch("../public/json/alert.json")
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             const sectionElement = document.createElement("section");
//             sectionElement.classList.add("alert-list");
//             for (const alertData of data) {
//                 const message = alertData.message;
//                 const background = alertData.background;
//                 const color = alertData.color;
//                 const alert = new Alert(message, background, color);
//                 const alertElement = document.createElement("p");
//                 alertElement.textContent = alert.message;
//                 alertElement.style.backgroundColor = alert.background;
//                 alertElement.style.color = alert.color;
//                 sectionElement.appendChild(alertElement);
//             }
//             const main = document.querySelector("main");
//             main.prepend(sectionElement);
//         })
//         .catch(error => console.error(error));
//     }
// }

