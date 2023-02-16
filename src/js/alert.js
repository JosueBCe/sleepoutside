export default class Alert {
    constructor() {
        fetch("sleepoutside/src/public/json/alert.json")
        .then(response => response.json())
        .then(data => {
            // Create element <section class="alert-list>
            const sectionElement = document.createElement("section");
            sectionElement.classList.add("alert-list");
            // Loop through the results and build a <p> for each alert
            for (const alertData of data) {
              const { message, background, color } = alertData;
              const alert = new Alert(message, background, color);
              const alertElement = document.createElement('p');
              // Apply the background and foreground colors to it specified in the alert.
              alertElement.textContent = alert.message;
              alertElement.style.backgroundColor = alert.background;
              alertElement.style.color = alert.color;
              sectionElement.appendChild(alertElement);
            }
        
            const main = document.querySelector('main');
            main.prepend(sectionElement);

        })
        .catch(error => console.error(error));
    }
}

// export default class Alert {
//     constructor() {
//       const fs = require('fs');
//       const data = fs.readFileSync("/public/json/alert.json");
//       this.alertData = JSON.parse(data);
//     }
  
//     fetch(messg) {
//       if (messg in this.alertData) {
//         return this.alertData[messg];
//       } else {
//         throw new Error(`Key ${messg} not found in alert.json`);
//       }
//     }
// } 
  
