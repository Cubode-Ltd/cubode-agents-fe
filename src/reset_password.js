import './css/main.css';
import { getCookie } from './utils/Mix'


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat_password').value;

    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
    }

    fetch('/auth/api/reset-password/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: new URLSearchParams({
            password: password,
            repeat_password: repeatPassword
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