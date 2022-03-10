import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";
import searchProducts from "./ui/searchProducts.js";

createMenu();

async function fetchProducts () {
    const productsUrl = baseUrl + "/products";
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        productsContainer(json);
        searchProducts(json);
        
} catch {
  console.log (error)
          displayMessage("error", error, ".row");
  }
};

fetchProducts();

export function productsContainer (json) {
  const container = document.querySelector(".row");
        container.innerHTML = "";

         /* if(!product.image.url || !product.featured) {
              container.innerHTML += ``;  
            } */ 

        json.forEach(function (product) {
          console.log(product.image.url);
            container.innerHTML += `
            <div class="col-md-3">
            <a class="product" href="detail.html?id=${product.id}" style="text-decoration: none">
            <div class="card-block h-100" style="width: 15rem;">
            <div class="card-body">
            <!-- <img src="${product.image.url}" class="card-img-top" alt="Mascara" > -->
            <h2 class="card-title" style="font-size: 1.25rem;" data-toggle="tooltip" data-placement="bottom" title="${product.brand} ${product.name} ${product.color}">
                ${product.brand}
                ${product.name}
                ${product.color}
             </h2>
             <p class="card-text">$ ${product.price}</p>
             </a>
             <button class="cart-btn" data-product="${product.id}">View product</button>
             <a class="edit-btn" href="edit.html?id=${product.id}">Edit</a>
             </div>
             </div>
             </div>
             `
             ;
        });
};