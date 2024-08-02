import "./css/main.css";
import { APIs } from "./utils/Apis.js";
import { Notyf } from "notyf";

const notyf = new Notyf();

document
  .getElementById("continueButton")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("passwordField");
    passwordField.classList.remove("hidden");
    passwordField.classList.add("fade-in");
    document.getElementById("continueButton").classList.add("hidden");
    document.getElementById("submitButton").classList.remove("hidden");
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    APIs.login(email, password)
      .then((data) => {
        if (data.message) {
          window.location.href = "/";
        } else {
          notyf.error("Check the credentials");
        }
      })
      .catch((error) => {
        notyf.error("Something went wrong, try again.");
      });
  });
