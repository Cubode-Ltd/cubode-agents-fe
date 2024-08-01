import './css/main.css';
import { APIs } from './utils/Apis.js';
import { Notyf } from 'notyf';


const notyf = new Notyf();

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat_password').value;
    if (password !== repeatPassword) {
        notyf.error('Passwords do not match!');
        return;
    }

    APIs.resetPassword(password, repeatPassword)
        .then(data => {
            if (data.message) {
                notyf.success('We have sent you an email!');
            } else {
                notyf.error('Something went wrong');
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
});