import { productsContainer } from "../script.js";

export default function searchProducts(product, targetElement) {

  const searchfield = document.querySelector(".form-control");

  searchfield.onkeyup = function (event) {
    const searching = event.target.value.trim().toLowerCase();

    const filteredSearch = product.filter(function (search) {
      if (search.name.toLowerCase().includes(searching) || search.brand.toLowerCase().includes(searching)) {
        return true;
      } 

    });

    //searchProducts(filteredSearch, container);
    console.log(filteredSearch);
    productsContainer(filteredSearch, targetElement);
  };
}