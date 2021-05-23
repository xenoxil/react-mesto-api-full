export class Auth {
  constructor(options) {
    // тело конструктора
    this._options = options;
    this._headers = this._options.headers;
  }

  register(email, password) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",     
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  login(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  logout() {
    return fetch(`${this._options.baseUrl}/`, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },     
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  /*checkToken(token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка проверки токена входа: ${res.status}`);
      }
    });
  }*/
}

const auth = new Auth({
  baseUrl: "https://api.xenoxil.mesto.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
