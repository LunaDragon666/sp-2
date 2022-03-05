import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logout.js";

export default function createMenu() {
  const { pathname } = document.location;

    const menu = document.querySelector(".navbar");

    const username = getUsername();
    console.log(username);

    let authLink = `<li class="nav-item">
                        <a href="login.html" class="nav-link ${pathname === "/login.html" ? "active" : ""}">
                           <i class="ri-user-3-fill"></i>
                        </a>
                     </li>`;

    if (username) {
        authLink = `<li class="nav-item">
                        <a id="logout" class="nav-link">
                           <i class="ri-logout-box-r-fill"></i>
                        </a>
                     </li>`;
    }

    menu.innerHTML = `<a href="/" class="navbar-brand nav-link ${pathname === "/" ? "active" : ""}">Betanya</a>
                      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="navbar-collapse collapse" id="navbarNav">
                      <ul class="navbar-nav ml-auto">
                          <li class="nav-item">
                              <a href="/" class="nav-link ${pathname === "/" ? "active" : ""}">Home</a>
                          </li>
                          <li class="nav-item">
                          <a href="products.html" class="nav-link ${pathname === "/products.html" ? "active" : ""}">Products</a>
                          </li>
                       </ul>
                       <ul class="navbar-nav ml-auto">
                           <li class="nav-item">
                           <a href="cart.html" class="nav-link ${pathname === "/cart.html" ? "active" : ""}">
                           <i class="ri-shopping-basket-2-fill"></i>
                           </a>
                           </li>
                           ${authLink}
                        </ul>
                     </div>`
                     ;
                     logoutButton();
}