import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

const token = getToken();

if (!token) {
    location.href = "products.html";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const editForm = document.querySelector(".edit-form");
const updateMessage = document.querySelector(".message-cont");
const loading = document.querySelector(".loading");

const brand = document.querySelector("#brand");
const color = document.querySelector("#color");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const note = document.querySelector("#note");
const price = document.querySelector("#price");
const name = document.querySelector("#name");
const product_type = document.querySelector("#product_type");

const productUrl = baseUrl + "/makeups/" + id;

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        brand.value = details.brand;
        color.value = details.color;
        description.value = details.description;
        note.value = details.note;
        price.value = details.price;
        name.value = details.name;
        product_type.value = details.product_type;
        idInput.value = details.id;

        deleteButton(details.id);

        console.log(details);
    } catch (error) {
        console.log(error);
    } finally {
        loading.style.display = "none";
        editForm.style.display = "block";
    } 
})();

editForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    updateMessage.innerHTML = "";

    const brandValue = brand.value.trim();
    const colorValue = color.value.trim();
    const descriptionValue = description.value.trim();
    const nameValue = name.value.trim();
    const noteValue = note.value.trim();
    const priceValue = parseFloat(price.value);
    const productValue = product_type.value.trim();
    const idValue = idInput.value;

    if (brandValue.length === 0 || colorValue.length === 0 || descriptionValue.length === 0 || nameValue.length === 0 || productValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || noteValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-cont");
    }

    updateProduct(brandValue, colorValue, descriptionValue, nameValue, priceValue, productValue, noteValue, idValue);
}

async function updateProduct(name, brand, product_type, price, note, color, description, id) {
    const url = baseUrl + "/makeups/" + id; //?
    const data = JSON.stringify({ name: name, brand: brand, product_type: product_type, price: price, note: note, color: color, description: description
   });

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "/application/json/",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if (json.error) {
            displayMessage("error", "Failed to update product", ".message-cont");
        }
    } catch (error) {
        displayMessage("error", "An error occured", ".message-cont");
        console.log(error);
    }
}