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
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    APIs.register(email, password)
      .then((data) => {
        if (data.message) {
          notyf.success(
            "We have sent you a confirmation email, check your inbox"
          );
        } else {
          notyf.success(
            "We have sent you a confirmation email, check your inbox"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
