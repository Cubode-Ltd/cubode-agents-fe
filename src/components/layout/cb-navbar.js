const template = document.createElement("template");
template.innerHTML = `
<nav class="sticky top-0 z-50 my-6">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
        <div class="flex-shrink-0">
            <!-- SVG content here -->
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
            <div class="flex items-center justify-center space-x-4">
                <cb-data-upload></cb-data-upload>
                <cb-login-dropdown></cb-login-dropdown>
            </div>
        </div>

        <div class="flex-shrink-0 lg:flex">
            <label class="inline-flex items-center cursor-pointer no-select">
                <span id="lightDarkCheckboxLabel"
                    class="ml-3 mr-2 text-xs font-medium text-gray-900 dark:text-gray-300">🌞Light</span>
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

<button id="inviteButton"
    class="px-6 py-3 text-sm bg-transparent border rounded-md hover:bg-gray-100 no-select">Invite</button>



<!-- Pop-up Modal -->
<div id="inviteModal" class="fixed inset-0 flex items-center justify-center z-50 hidden">
    <div class="w-[600px] h-[311px] relative">
        <div class="w-[600px] h-[311px] left-0 top-0 absolute bg-[#2d2d2a] rounded shadow"></div>
        <div class="w-[34px] h-[34px] left-[546px] top-[20px] absolute">
            <button id="closeModalButton" class="w-[34px] h-[34px] left-0 top-0 absolute bg-[#2d2d2a] rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <g id="Group 34">
                        <g id="Group 32">
                            <g id="Group 26">
                                <rect id="Rectangle 21" width="34" height="34" rx="4" fill="#2D2D2A" />
                            </g>
                        </g>
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.1831 12.1831C12.4271 11.939 12.8229 11.939 13.0669 12.1831L17 16.1161L20.9331 12.1831C21.1771 11.939 21.5729 11.939 21.817 12.1831C22.061 12.4271 22.061 12.8229 21.817 13.0669L17.8839 17L21.817 20.9331C22.061 21.1771 22.061 21.5729 21.817 21.817C21.5729 22.061 21.1771 22.061 20.9331 21.817L17 17.8839L13.0669 21.817C12.8229 22.061 12.4271 22.061 12.1831 21.817C11.939 21.5729 11.939 21.1771 12.1831 20.9331L16.1161 17L12.1831 13.0669C11.939 12.8229 11.939 12.4271 12.1831 12.1831Z"
                            fill="white" fill-opacity="0.6" />
                    </g>
                </svg>
            </button>
        </div>
        <div
            class="w-[500px] h-[210px] left-[50px] top-[50px] absolute flex-col justify-start items-center gap-10 inline-flex">
            <div class="self-stretch h-[120px] flex-col justify-start items-center gap-[45px] flex">
                <div class="self-stretch text-center text-white text-lg font-normal font-['Poppins']">Invite to Cubode
                </div>
                <div class="self-stretch h-12 flex-col justify-start items-center gap-[30px] flex">
                    <div
                        class="w-[500px] h-12 px-5 py-2.5 bg-[#2d2d2a] rounded border-2 border-[#7da0ce] justify-start items-center gap-5 inline-flex">
                        <input type="email" id="inviteEmail"
                            class="flex-col justify-center items-start gap-0.5 inline-flex bg-[#2d2d2a] text-white text-sm font-normal font-['Poppins']" placeholder="Invite others by Email">
                        </input>
                    </div>
                </div>
            </div>
            <label class="h-[50px] px-5 py-2.5 bg-[#ffa987] rounded-sm justify-center items-center gap-2.5 inline-flex">
                <div class="px-5 rounded-sm justify-center items-center gap-2.5 flex">
                    <button id="sendInviteButton"
                        class="text-center text-[#2d2d2a] text-[15px] font-medium font-['Poppins'] leading-[30px]">Send
                        Invite</button>
                </div>
        </div>
    </div>
</div>
</div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));

    this.checkbox = this.querySelector("#lightDarkCheckbox");
    this.checkboxLabel = this.querySelector("#lightDarkCheckboxLabel");
    this.dropdown = this.querySelector("cb-login-dropdown");

    this.mainElement = this.querySelector("nav");

    this.inviteButton = this.querySelector("#inviteButton");
    this.inviteModal = this.querySelector("#inviteModal");
    this.closeModalButton = this.querySelector("#closeModalButton");
    this.sendInviteButton = this.querySelector("#sendInviteButton");

    this.checkbox.addEventListener("change", () => this.toggleDarkMode());
    this.inviteButton.addEventListener("click", () => this.showInviteModal());
    this.closeModalButton.addEventListener("click", () =>
      this.hideInviteModal()
    );
    this.sendInviteButton.addEventListener("click", () => this.sendInvite());

    this.updateDarkMode();
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

  showInviteModal() {
    console.log("ciao");
    document.body.classList.add("bg-black/50");
    this.inviteModal.classList.remove("hidden");
  }

  hideInviteModal() {
    document.body.classList.remove("bg-black/50");
    this.inviteModal.classList.add("hidden");
  }

  sendInvite() {
    const email = this.querySelector("#inviteEmail").value;
    if (email) {
      // Implement your invite sending logic here
      console.log(`Invite sent to ${email}`);

      fetch("http://localhost:8000/api/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            alert("Email sent successfully!");
          } else {
            alert("Failed to send email: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to send email.");
        });
      this.hideInviteModal();
    } else {
      alert("Please enter a valid email address.");
    }
  }
}

customElements.define("cb-navbar", NavBar);

// import { APIs } from "../../utils/Apis";
// const template = document.createElement("template");
// template.innerHTML = `
//   <nav class="sticky top-0 z-50 my-6">
//     <div class="container mx-auto px-4 py-2 flex items-center justify-between">
//       <div class="flex-shrink-0">
//         <!-- SVG content here -->
//       </div>

//       <div class="absolute inset-0 flex items-center justify-center">
//         <div class="flex items-center justify-center space-x-4">
//           <cb-data-upload></cb-data-upload>
//           <cb-login-dropdown></cb-login-dropdown>
//         </div>
//       </div>

//       <div class="flex-shrink-0 lg:flex">
//         <button id="inviteButton" class="px-6 py-3 text-sm bg-transparent border rounded-md hover:bg-gray-100 no-select">Invite</button>

//         <label class="inline-flex items-center cursor-pointer no-select">
//             <span id="lightDarkCheckboxLabel" class="ml-3 mr-2 text-xs font-medium text-gray-900 dark:text-gray-300">🌞Light</span>
//             <input type="checkbox" id="lightDarkCheckbox" value="" class="sr-only peer">
//             <div title="Switch Dark and Light Mode"
//                 class="relative w-11 h-6 bg-gray-200
//                 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
//                 dark:peer-focus:ring-blue-800
//                 rounded-full
//                 peer
//                 dark:border-gray-600 peer-checked:bg-blue-600
//                 dark:bg-gray-700
//                 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
//                 peer-checked:after:translate-x-full
//                 rtl:peer-checked:after:-translate-x-full
//                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ">
//             </div>
//         </label>
//       </div>
//     </div>
//   </nav>

//   <!-- Pop-up Modal -->
//   <div id="inviteModal" class="fixed inset-0 flex items-center justify-center z-50 hidden">
//     <div class="bg-white p-6 rounded-lg shadow-lg">
//       <h2 class="text-lg mb-4">Invite a User</h2>
//       <input type="email" id="inviteEmail" class="border p-2 rounded w-full mb-4" placeholder="Enter email">
//       <button id="sendInviteButton" class="px-4 py-2 bg-blue-600 text-white rounded">Send Invite</button>
//       <button id="closeModalButton" class="px-4 py-2 bg-gray-400 text-white rounded mt-2">Close</button>
//     </div>
//   </div>
// `;

// class NavBar extends HTMLElement {
//   constructor() {
//     super();
//     this.appendChild(template.content.cloneNode(true));

//     this.checkbox = this.querySelector("#lightDarkCheckbox");
//     this.checkboxLabel = this.querySelector("#lightDarkCheckboxLabel");
//     this.dropdown = this.querySelector("cb-login-dropdown");

//     this.mainElement = this.querySelector("nav");

//     this.inviteButton = this.querySelector("#inviteButton");
//     this.inviteModal = this.querySelector("#inviteModal");
//     this.closeModalButton = this.querySelector("#closeModalButton");
//     this.sendInviteButton = this.querySelector("#sendInviteButton");

//     this.checkbox.addEventListener("change", () => this.toggleDarkMode());
//     this.inviteButton.addEventListener("click", () => this.showInviteModal());
//     this.closeModalButton.addEventListener("click", () => this.hideInviteModal());
//     this.sendInviteButton.addEventListener("click", () => this.sendInvite());

//         // Ensure elements are found before adding event listeners
//         if (this.inviteButton) {
//           this.inviteButton.addEventListener("click", () => this.showInviteModal());
//           console.log("Invite button event listener added");
//         } else {
//           console.error("Invite button not found");
//         }

//         if (this.closeModalButton) {
//           this.closeModalButton.addEventListener("click", () => this.hideInviteModal());
//           console.log("Close modal button event listener added");
//         } else {
//           console.error("Close modal button not found");
//         }

//         if (this.sendInviteButton) {
//           this.sendInviteButton.addEventListener("click", () => this.sendInvite());
//           console.log("Send invite button event listener added");
//         } else {
//           console.error("Send invite button not found");
//         }

//         if (this.checkbox) {
//           this.checkbox.addEventListener("change", () => this.toggleDarkMode());
//           console.log("Checkbox event listener added");
//         } else {
//           console.error("Checkbox not found");
//         }

//     this.updateDarkMode();

//   }

//   async connectedCallback() {
//     this.updateDarkMode();

//     // await this.fetchUserData();
//   }

//   // async fetchUserData() {
//   //   try {
//   //     const userData = await APIs.fetchUserData();
//   //     this.dropdown.authenticated = userData;
//   //   } catch (error) {
//   //     console.error("Failed to fetch user data:", error);
//   //   }
//   // }

//   toggleDarkMode() {
//     if (this.checkbox.checked) {
//       document.body.classList.add("dark");
//       this.checkboxLabel.textContent = "🌜 Dark";
//     } else {
//       document.body.classList.remove("dark");
//       this.checkboxLabel.textContent = "🌞 Light";
//     }
//     this.updateDarkMode();
//   }

//   updateDarkMode() {
//     if (document.body.classList.contains("dark")) {
//       this.mainElement.classList.add("dark");
//     } else {
//       this.mainElement.classList.remove("dark");
//     }
//   }

//   showInviteModal() {
//     console.log("Invite button clicked");
//     if(this.inviteModal.classList.contains("hidden") ){
//       console.log('ciao');

//       this.inviteModal.classList.remove("hidden");}

//   }

//   hideInviteModal() {
//     console.log("Close modal button clicked");
//     this.inviteModal.classList.add("hidden");
//   }

//   sendInvite() {
//     const email = this.querySelector("#inviteEmail").value;
//     if (email) {
//       // Implement your invite sending logic here
//       console.log(`Invite sent to ${email}`);
//       this.hideInviteModal();
//     } else {
//       alert("Please enter a valid email address.");
//     }
//   }
// }

// customElements.define("cb-navbar", NavBar);

// // Ensure the custom element is instantiated after the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//   document.body.appendChild(document.createElement("cb-navbar"));
// });
