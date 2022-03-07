import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const shoppingCart = document.querySelector(".shopping-cart");
let cartList = [];

createMenu();

if (!id) {
    document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;
console.log(productUrl);

async function getProduct() {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        document.title = details.brand + ' ' + details.name + ' ' + details.color;

        const container = document.querySelector(".row");
        container.innerHTML = `<div class="col">
                                <!-- Place image here -->
                                <img src="${details.image.url}" class="card-img" alt="${details.brand} ${details.name} ${details.color}" >
                              </div>
                              <div class="col">
                                <h1>
                                    ${details.brand}
                                    ${details.name}
                                    ${details.color}
                                </h1>
                                <p>
                                    ${details.description}
                                </p>
                                <p>
                                    ${details.note}
                                </p>
                                <button class="cart-btn" data-row="${details.id}"}>
                                  Add to cart
                                </button>
                              </div>
                            `;
        console.log(details);
    } catch (error) {
        displayMessage("error", error, ".row");
    }
// shoppimg cart start
  if(localStorage.getItem("row")) {
    console.log("1");
    cartList = JSON.parse(localStorage.getItem("row"));
    shoppingCart.innerHTML = "";
    addCartItemsToPage(cartList);
  };
  const addToCartButtons = document.querySelectorAll(".cart-btn");
  addToCartButtons.forEach(button => {
    console.log("2");
    button.onclick = function(event){
      cartList.push(event.target.dataset.product);
      localStorage.setItem("row",JSON.stringify(cartList));
      shoppingCart.innerHTML = "";
      addCartItemsToPage(cartList);
    }
  })
  function addCartItemsToPage(list){
    console.log("5");
    list.forEach(cartItem => {
      const matchingItem = results.find(function(item){
        if(item.id === parseInt(cartItem)){
          return true;
        }
      })
      shoppingCart.innerHTML += `<li>
                                    ${matchingItem.brand}
                                    ${matchingItem.name}
                                    ${matchingItem.color}
                                    <button class="delete" data-id="${matchingItem.id}">
                                      Delete
                                    </button>
                                  </li>`;
      console.log(shoppingCart);
    })
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
      console.log("3");
      button.onclick = function(event){
        const idOfProductClicked = event.target.dataset.id;
        const newCartList = list.filter(function(item){
          if(item !== idOfProductClicked){
            return true;
          }
        })
        list = newCartList;
        console.log("4");
        localStorage.setItem("row",JSON.stringify(list));
        shoppingCart.innerHTML = "";
        addCartItemsToPage(list);
      }
    })
  }
  // shopping cart function(s) ends here
}

getProduct();