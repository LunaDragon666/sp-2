import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";

createMenu();

const productsInCart = JSON.parse(localStorage.getItem("row"));
console.log(productsInCart);

const cart = document.querySelector(".cart");
const productUrl = baseUrl + "/makeups/" + id;

async function getProducts() {
    const response = await fetch(productUrl);
    const results = await response.json();
    productsInCart.forEach(cartItem => {
      const matchingItem = results.find(function(item){
        if(item.id === parseInt(cartItem)){
          return true;
        }
      })
      cart.innerHTML += matchingItem.name;
    })
  }
  getProducts();