class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _getResult(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getResult)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getResult)
  }

  editProfileBio(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._getResult)
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._getResult)
  }

  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResult)
  }

  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._getResult)
  }

  unlike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResult)
  }

  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._getResult)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.unlike(id);
    }
    else {
      return this.setLike(id);
    }
  }

}

const api = new Api('sleepydoo.mesto.nomoredomains.xyz',
  {
    'Content-Type': 'application/json'
  });

export default api;
