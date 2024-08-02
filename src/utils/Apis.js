import axios from "axios";

export class APIs {
  static getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  static async postRequest(endpoint, data) {
    const csrfToken = this.getCookie("csrftoken");
    const response = await axios.post(endpoint, new URLSearchParams(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrfToken,
      },
    });
    return response.data;
  }

  static async getRequest(endpoint) {
    const response = await axios.get(endpoint);
    return response.data;
  }

  static async fetchUserData() {
    try {
      const userData = await this.getRequest("/auth/api/is-authenticated/");
      return userData;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error; // Re-throw the error if needed
    }
  }

  static resetPasswordConfirm(password, repeatPassword) {
    return this.postRequest("/auth/api/reset-password-confirm/", {
      password: password,
      repeat_password: repeatPassword,
    });
  }

  static resetPassword(email) {
    return this.postRequest("/auth/api/reset-password/", {
      email: email,
    });
  }

  static register(email, password) {
    return this.postRequest("/auth/api/register/", {
      email: email,
      password: password,
    });
  }

  static login(email, password) {
    return this.postRequest("/auth/api/login/", {
      email: email,
      password: password,
    });
  }

  static async logout() {
    try {
      const response = await this.postRequest("/auth/api/logout/", {});
      document.cookie = "access_token=; Max-Age=0; path=/;";
      document.cookie = "refresh_token=; Max-Age=0; path=/;";
      return response;
    } catch (error) {
      console.error("Failed to logout:", error);
      throw error;
    }
  }
}
