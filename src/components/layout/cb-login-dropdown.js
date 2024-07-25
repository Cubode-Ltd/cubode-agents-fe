const template = document.createElement('template');
template.innerHTML = `
      <style>@import "css/index.css";</style>
      <div class="flex items-center h-11 px-2 border rounded justify-center relative no-select bg-[#2D2D2A]">
        <div class="burger-icon cursor-pointer w-6 h-6 mr-3 fill-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5rem" height="1.5rem" id="Layer_1" version="1.1" viewBox="0 0 32 32" xml:space="preserve">
            <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"></path>
          </svg>

          <ul class="dropdown-content rounded hidden absolute bg-[#2D2D2A] text-white text-sm shadow-lg z-10 list-none p-0 m-0 mt-1 min-w-[200px] top-full left-0 ring-1 ring-black ring-opacity-5">
            <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer whitespace-nowrap">Sign In</li>
            <hr class="mx-2">
            <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer whitespace-nowrap">Profile Settings</li>
            <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer whitespace-nowrap">File History</li>
            <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer whitespace-nowrap">GitHub</li>
            <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer whitespace-nowrap">Join Community</li>
            <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer whitespace-nowrap">Upgrade</li>
            <li class="px-4 py-3 hover:bg-gray-700 cursor-pointer whitespace-nowrap">Request a Feature</li>
          </ul>
        </div>
        <a href="#" class="avatar cursor-pointer" title="profile">
          <svg xmlns="http://www.w3.org/2000/svg" class="rounded-full border-2 border-white bg-gray-400 w-7 h-7" viewBox="0 0 16 16">
              <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0" fill="#2e3436"/>
          </svg>
        </a>
      </div>
`;

class MenuDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('.burger-icon').addEventListener('click', (event) => {
      this.toggleDropdown(event);
    });

    // Event listener for outside click
    document.addEventListener('click', (event) => {
      this.handleOutsideClick(event);
    });
  }

  toggleDropdown(event) {
    const dropdown = this.shadowRoot.querySelector('.dropdown-content');
    dropdown.classList.toggle('hidden');
    event.stopPropagation(); // Prevent click event from bubbling up to document
  }

  handleOutsideClick(event) {
    const dropdown = this.shadowRoot.querySelector('.dropdown-content');
    if (!this.contains(event.target)) {
      dropdown.classList.add('hidden');
    }
  }
}

customElements.define('cb-login-dropdown', MenuDropdown);
