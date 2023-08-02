class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        console.log("Ответ сервера: ", res);
        return res.ok
            ? res.json()
            : res.json().then(err => Promise.reject(`${err.message || res.status}`));
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._handleResponse);
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;
