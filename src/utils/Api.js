class Api {
  constructor(url) {
    this._url = url;
  }

  _getResult(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo(jwt) {
    console.log('serv' + localStorage.getItem('jwt'));
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      }
    })
      .then(this._getResult)
  }

  getInitialCards(jwt) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      }
    })
      .then(this._getResult)
  }

  editProfileBio(data, jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._getResult)
  }

  addNewCard(data, jwt) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._getResult)
  }

  removeCard(id, jwt) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      }
    })
      .then(this._getResult)
  }

  setLike(id, jwt) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      }
    })
      .then(this._getResult)
  }

  unlike(id, jwt) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      }
    })
      .then(this._getResult)
  }

  setAvatar(data, jwt) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._getResult)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.unlike(id, localStorage.getItem('jwt'));
    }
    else {
      return this.setLike(id, localStorage.getItem('jwt'));
    }
  }

}

const api = new Api('https://api.sleepydoo.mesto.nomoredomains.xyz');

export default api;
