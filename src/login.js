import './css/main.css';

document.getElementById('continueButton').addEventListener('click', function() {
    document.getElementById('passwordField').classList.remove('hidden');
    passwordField.classList.add('fade-in');

    document.getElementById('continueButton').classList.add('hidden');
    document.getElementById('submitButton').classList.remove('hidden');
});