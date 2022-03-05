import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";

createMenu();

// Header API call 
async function fetchHeader() {
    const container = document.querySelector(".hero_banner");
    const url = "http://localhost:8082/header";

    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    container.innerHTML = `
    <div
    class="header-image text-center bg-image"
    style="
      background-image: url('${baseUrl}${json.Hero_banner.url}');
      height: 425px;
    ">
    <div class="mask" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="d-flex justify-content-center align-items-center h-100">
        <div class="text-white">
          <h1 class="mb-3">${json.heading_title}</h1>
          <p class="mb-3" style="font-size: 1.25rem">${json.headline}</p>
          <a class="cta-button" href="products.html">Shop now</a>
        </div>
      </div>
    </div>
  </div>

                        ` 
}

fetchHeader();


// Featured products display
const productsUrl = baseUrl + "/makeups";

async function makeApiCall() {
    const resultsContainer = document.querySelector(".row");
    resultsContainer.innerHTML = "";
    try {
        const response = await fetch(productsUrl);
        const results = await response.json();

        console.log(results);

        for(let i = 0; i < results.length; i++) {

            if(!results[i].featured) {
                continue;
            }

            resultsContainer.innerHTML += `<div class="col-md-3">
            <a class="product" href="detail.html?id=${results[i].id}" style="text-decoration: none">
            <div class="card-block h-100" style="width: 15rem;">
            <div class="card-body">
            <img src="${baseUrl}${results[i].image[0].url}" class="card-img-top" alt="Mascara" >
                                            <h2 class="card-title" style="font-size: 1.25rem;" data-toggle="tooltip" data-placement="bottom" title="${results[i].brand} ${results[i].name} ${results[i].color}">
                                            ${results[i].brand}
                                            ${results[i].name}
                                            ${results[i].color}
                                         </h2>
                                         <p class="card-text">$ ${results[i].price}</p>
                                         <div class="button-wrap">
                                         <a href="detail.html?id=${results[i].id}" class="view-btn">View product</a>
                                         </div>
                                            </div>
                                            </div>
                                            </a>
                                        </div>
             `
        }

    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".row");
    }
}

makeApiCall();