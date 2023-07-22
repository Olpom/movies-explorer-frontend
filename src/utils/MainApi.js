class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Обработчик ошибок
  _handleResponse(res) {
    console.log("Response from server: ", res);
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
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
    console.log("Data sent to server for login: ", { email, password });
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
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  updateUserInfo(data) {
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
    this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default mainApi;
