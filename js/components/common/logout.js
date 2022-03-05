import { clearStorage } from "../../utils/storage.js";

export default function logoutButton() {
    const logoutBtn = document.querySelector("#logout"); 

    if (logoutBtn) {
        logoutBtn.onclick = function () {
            const doLogout = confirm("Are you sure you want to sign out?");

            if (doLogout) {
                clearStorage();
                location.href = "login.html";
            }
        };
    }
}