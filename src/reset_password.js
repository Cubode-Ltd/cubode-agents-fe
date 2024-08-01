import './css/main.css';
import { APIs } from './utils/Apis.js';
import { Notyf } from 'notyf';


const notyf = new Notyf();

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    APIs.resetPassword(email)
        .then(data => {
            if (data.message) {
                notyf.success('We have sent you an email!');
            } else {
                notyf.error('Something went wrong');
            }
        })
        .catch(error => {
            notyf.error('Something went wrong');
        })
});