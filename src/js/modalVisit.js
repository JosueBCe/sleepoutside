
export function visit() {

    const title = document.createElement("div");
    title.classList.add("titleVisit");
    title.innerHTML = `  <div class="logo logoAnimation">
                            <img src="/images/noun_Tent_2517.svg" alt="tent image for logo" />
                            <span> Sleep<span class="highlight">Outside</span></span>
                        </div>

                        <button id="buttonVisit" class="closeFirstVisit">&#10006;</button>`

    const first = document.createElement("div");
    first.innerHTML =  `<p class="firstVisitP">
                            Welcome, fill out the registration form and you will have a 50% of
                            discount on your first order
                        </p>`

    const button = document.createElement("button");
    button.id = "register";
    button.textContent = "Sign Up";

    const addVisit = document.querySelector("#modalVisit");
    addVisit.appendChild(title);
    addVisit.appendChild(first);
    addVisit.appendChild(button);
    
}