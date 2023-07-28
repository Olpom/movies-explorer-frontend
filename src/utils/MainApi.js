class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Обработчик ошибок
  _handleResponse(res) {
    console.log("Ответ сервера: ", res);
    return res.ok
      ? res.json()
      : res.json().then(err => Promise.reject(`${err.message || res.status}`));
  }

  // Функция регистрации пользователя
  register({ name, email, password }) {
    console.log('Registering with data: ', { name, email, password });
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(this._handleResponse)
  };

  // Функция авторизации пользователя
  login({ email, password }) {
    console.log('Logging in with data: ', { email, password });
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._handleResponse)
  };

  // Задаем токен
  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleResponse);
  }

  // Получаем данные пользователя
  getUserInfo() {
    console.log('Headers before getUserInfo: ', this._headers);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  updateUserInfo(data) {
    console.log('Headers before updateUserInfo: ', this._headers);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    })
      .then(this._handleResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  addMovies(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._handleResponse);
  }

  deleteMovies(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  updateToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this._headers.authorization = `Bearer ${token}`;
      console.log('Updated headers: ', this._headers);
    } else {
      delete this._headers.authorization;
      console.log('Deleted authorization from headers: ', this._headers);
    }
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;
