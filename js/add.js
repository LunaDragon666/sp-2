import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";
import { getToken } from "./utils/storage.js"

const token = getToken();

if (!token) {
    location.href = "products.html";
}

createMenu();

const addForm = document.querySelector(".add-form");
const addMessage = document.querySelector(".message-cont");

const brand = document.querySelector("#brand");
const color = document.querySelector("#color");
const description = document.querySelector("#description");
const note = document.querySelector("#note");
const price = document.querySelector("#price");
const name = document.querySelector("#name");
const product_type = document.querySelector("#product_type");

addForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    addMessage.innerHTML = "";

    const brandValue = brand.value.trim();
    const colorValue = color.value.trim();
    const descriptionValue = description.value.trim();
    const nameValue = name.value.trim();
    const noteValue = note.value.trim();
    const priceValue = parseFloat(price.value);
    const productValue = product_type.value.trim();

    console.log("priceValue", priceValue);

    if (brandValue.length === 0 || colorValue.length === 0 || descriptionValue.length === 0 || nameValue.length === 0 || productValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || noteValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-cont");
    }

    addProduct(brandValue, colorValue, descriptionValue,  nameValue, priceValue, productValue, noteValue);
}

async function addProduct(name, brand, product_type, price, note, color, description) {
    const url = baseUrl + "/makeups/";

    const data = JSON.stringify({ name: name, brand: brand, product_type: product_type, price: price, note: note, color: color, description: description });

    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "/application/json/", // "/" before application/json/?
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("success", "Product created", ".message-cont");
            addForm.reset();
        }

        if (json.error) {
            displayMessage("error", "Failed to create product", ".message-cont");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-cont");
    }
}