import axios from 'axios';

export class APIs {
    static getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    static async postRequest(endpoint, data) {
        const csrfToken = this.getCookie('csrftoken');
        const response = await axios.post(endpoint, new URLSearchParams(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken
            }
        });
        return response.data;
    }

    static resetPassword(password, repeatPassword) {
        return this.postRequest('/auth/api/reset-password/', {
            password: password,
            repeat_password: repeatPassword
        });
    }

    static register(email, password) {
        return this.postRequest('/auth/api/register/', {
            email: email,
            password: password
        });
    }

    static login(email, password) {
        return this.postRequest('/auth/api/login/', {
            email: email,
            password: password
        });
    }
}