import './css/main.css';
import { getCookie } from './utils/Mix'


document.getElementById('continueButton').addEventListener('click', function() {
    document.getElementById('passwordField').classList.remove('hidden');
    passwordField.classList.add('fade-in');
    document.getElementById('continueButton').classList.add('hidden');
    document.getElementById('submitButton').classList.remove('hidden');
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/auth/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: new URLSearchParams({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});