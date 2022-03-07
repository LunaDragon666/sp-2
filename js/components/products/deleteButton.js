import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";

export default function deleteButton(id) {
    const deleteContainer = document.querySelector(".delete-arena");

    deleteContainer.innerHTML = `<button type="button" class="delete">Delete</button>`;

    const deleteBtn = document.querySelector(".delete");

    console.log(deleteContainer);
    console.log(deleteBtn);

    deleteBtn.onclick = async function () {
        console.log(id);

        const doDelete = confirm("Are you sure?");
        console.log(doDelete);

        if(doDelete) {
            const url = baseUrl + "/products/" + id;

            const token = getToken();

            console.log(url);
            console.log(token);
    
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "products.html";
    
                console.log(json);
                console.log(response);

            } catch (error) {
                console.log(error);
            }
        }
    };
}