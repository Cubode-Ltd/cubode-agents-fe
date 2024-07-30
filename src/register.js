import './css/main.css';
import { APIs } from './utils/Apis.js';


document.getElementById('continueButton').addEventListener('click', function() {
    const passwordField = document.getElementById('passwordField')
          passwordField.classList.remove('hidden');
          passwordField.classList.add('fade-in');
    document.getElementById('continueButton').classList.add('hidden');
    document.getElementById('submitButton').classList.remove('hidden');
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    APIs.register(email, password)
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error)
        });
});