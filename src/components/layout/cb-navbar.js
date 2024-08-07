import { APIs } from "../../utils/Apis";

const template = document.createElement("template");
template.innerHTML = `
  <nav class="sticky top-0 z-50 my-6">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <div class="flex-shrink-0">
        <svg height="2rem" class="max-w-xs hidden lg:flex" alt="Cubode" id="Layer_1" data-name="Layer 1" viewBox="0 0 987.38 240.60608" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
          <path d="m 986.68,173.09305 c 0.25,-0.12 -117.17,67.62 -118.14,67.51 -0.09,0.65 0.41,-103.16 0.49,-103.16 L 987.14,69.233046 v 0 l -0.49,103.900004" style="fill:#1e395c" id="path438" />
          <path d="m 987.38,69.193046 c 0,0 -0.37,104.000004 -0.49,103.780004 v 0.07 c 0.17,0.5 -118.22,-68.58 -118,-68.92 v 0 L 869.35,0.39304619 c -0.19,-0.12 118,68.70999981 118,68.89999981" style="opacity:0.95;isolation:isolate;fill:#80a5d6" id="path440" />
          <path d="m 0.18,171.46305 c 0.07,0.19 117.94,68.87 117.76,68.75 l 0.51,-103.55 v 0 C 118.66,136.33305 0.28,67.483046 0.72,67.903046 v -0.06 L 0.23,171.51305" style="opacity:0.9;isolation:isolate;fill:#ffa987" id="path442" />
          <path d="M 0,171.01305 0.45,67.393046 h 0.11 c -0.21,0.09 116.89,-67.49999981 117.89,-67.38999981 0.09,-0.65 -0.41,102.94000381 -0.48,102.94000381 l -117.84,68.07" style="opacity:0.95;isolation:isolate;fill:#1e395c" id="path444" />
          <path d="m 215.88,54.483046 c 28.59,0 50.16,16.09 57,42.11 H 240.7 c -5,-10.27 -14,-15.41 -25.16,-15.41 -18,0 -30.3,13.35 -30.3,34.580004 0,21.23 12.32,34.63 30.3,34.63 11.13,0 20.2,-5.13 25.16,-15.41 h 32.19 c -6.85,26 -28.42,42 -57,42 -35.44,-0.1 -60.44,-25.27 -60.44,-61.22 0,-35.950004 25,-61.280004 60.43,-61.280004 z" style="fill:#1e395c" id="path446" />
          <path d="m 381.45,176.02305 h -29.24 v -13 c -5.82,8.22 -16.09,14 -28.93,14 -22.08,0 -37,-15.24 -37,-40.75 V 80.503046 h 29.17 v 51.890004 c 0,13 7.36,20.2 18.32,20.2 10.96,0 18.48,-7.19 18.48,-20.2 V 80.503046 h 29.2 z" style="fill:#1e395c" id="path448" />
          <path d="m 458.78,79.133046 c 23.62,0 42.11,18.83 42.11,49.000004 0,30.17 -18.66,49.26 -42.11,49.26 -14,0 -24.14,-6.33 -29.45,-14.72 v 13.35 H 400.06 V 49.393046 h 29.27 v 44.63 c 5.31,-8.56 15.75,-14.89 29.45,-14.89 z m -8.73,25.500004 c -11,0 -20.89,8.39 -20.89,23.63 0,15.24 9.93,23.62 20.89,23.62 10.96,0 21,-8.56 21,-23.79 0,-15.23 -9.87,-23.46 -21,-23.46 z" style="fill:#1e395c" id="path450" />
          <path d="m 557.72,177.39305 c -28.07,0 -49.3,-18.83 -49.3,-49.13 0,-30.300004 21.74,-49.130004 49.65,-49.130004 27.91,0 49.64,18.83 49.64,49.130004 0,30.3 -21.91,49.13 -49.99,49.13 z m 0,-25.34 c 10.45,0 20.2,-7.7 20.2,-23.79 0,-16.09 -9.58,-23.8 -19.85,-23.8 -10.27,0 -19.86,7.54 -19.86,23.8 0,16.13 8.9,23.79 19.51,23.79 z" style="fill:#1e395c" id="path452" />
          <path d="m 657.45,79.133046 c 12.67,0 23.63,5.82 29.45,14.55 v -44.29 h 29.27 V 176.02305 h -29.3 v -13.69 c -5.31,8.73 -15.42,15.06 -29.42,15.06 -23.45,0 -42.11,-19.17 -42.11,-49.3 0,-30.130004 18.63,-48.960004 42.11,-48.960004 z m 8.56,25.500004 c -10.95,0 -20.88,8.22 -20.88,23.46 0,15.24 9.93,23.79 20.88,23.79 10.95,0 20.89,-8.39 20.89,-23.62 0,-15.23 -9.79,-23.63 -20.92,-23.63 z" style="fill:#1e395c" id="path454" />
          <path d="m 777.73,177.39305 c -28.07,0 -48.28,-18.83 -48.28,-49.13 0,-30.300004 19.86,-49.130004 48.27,-49.130004 28.41,0 47.59,18.49 47.59,47.590004 0,2.86 -0.18,5.72 -0.51,8.56 h -66.24 c 1,12.49 8.73,18.31 18.15,18.31 8.21,0 12.84,-4.1 15.23,-9.24 h 31.16 c -4.65,18.66 -21.57,33.04 -45.37,33.04 z m -19,-58.38 h 36.64 c 0,-10.44 -8.22,-16.43 -18,-16.43 -9.57,0 -16.92,5.81 -18.64,16.43 z" style="fill:#1e395c" id="path456" />
        </svg>
      </div>
      
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="flex items-center justify-center space-x-4">
          <cb-data-upload></cb-data-upload>
          <cb-login-dropdown></cb-login-dropdown>
        </div>
      </div>
      
      <div class="flex-shrink-0 hidden lg:flex">
        <button class="px-6 py-3 text-sm bg-transparent border rounded-md hover:bg-gray-100 no-select">Invite</button>
        
        <label class="inline-flex hidden items-center cursor-pointer no-select">
            <span id="lightDarkCheckboxLabel" class="ml-3 mr-2 text-xs font-medium text-gray-900 dark:text-gray-300">🌞Light</span>

            <input type="checkbox" id="lightDarkCheckbox" value="" class="sr-only peer">
            <div title="Switch Dark and Light Mode"
                class="relative w-11 h-6 bg-gray-200 
                peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                dark:peer-focus:ring-blue-800 
                rounded-full 
                peer 
                dark:border-gray-600 peer-checked:bg-blue-600
                dark:bg-gray-700 
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                peer-checked:after:translate-x-full 
                rtl:peer-checked:after:-translate-x-full 
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ">
            </div>
        </label>
      </div>
    </div>
  </nav>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));

    this.checkbox = this.querySelector("#lightDarkCheckbox");
    this.checkboxLabel = this.querySelector("#lightDarkCheckboxLabel");
    this.dropdown = this.querySelector("cb-login-dropdown");

    this.mainElement = this.querySelector("nav");

    this.checkbox.addEventListener("change", () => this.toggleDarkMode());
    this.updateDarkMode();
  }

  async connectedCallback() {
    this.updateDarkMode();
    await this.fetchUserData();
  }

  async fetchUserData() {
    try {
      const userData = await APIs.fetchUserData();
      this.dropdown.authenticated = userData;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  toggleDarkMode() {
    if (this.checkbox.checked) {
      document.body.classList.add("dark");
      this.checkboxLabel.textContent = "🌜 Dark";
    } else {
      document.body.classList.remove("dark");
      this.checkboxLabel.textContent = "🌞 Light";
    }
    this.updateDarkMode();
  }

  updateDarkMode() {
    if (document.body.classList.contains("dark")) {
      this.mainElement.classList.add("dark");
    } else {
      this.mainElement.classList.remove("dark");
    }
  }
}

customElements.define("cb-navbar", NavBar);
