class Auth {
  constructor(url) {
    this._url = url;
  }

  _getResult(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": data.password,
        "email": data.email
      })
    }).then(this._getResult);
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    }).then(this._getResult);
  }

  signIn(data) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": data.password,
        "email": data.email
      })
    }).then(this._getResult);
  }
}

const auth = new Auth("https://auth.nomoreparties.co");

export default auth;
