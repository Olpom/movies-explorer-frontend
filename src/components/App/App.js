import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Page404 from '../Page404/Page404';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';

function App() {

  // переменные состояния для отслеживания состояния аутентификации пользователя
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  function handleRegister(userData) {
    mainApi.register({ name: userData.name, email: userData.email, password: userData.password })
      .then((res) => {
        console.log('Ответ сервера на регистрацию: ', res);
        if (res && res._id) {
          handleLogin(userData);
        }
      })
      .catch((err) => {
        console.log('Ошибка сервера при регистрации: ', err);
      });
  }

  function handleLogin(userData) {
    mainApi.login({ email: userData.email, password: userData.password })
      .then((res) => {
        console.log('Ответ сервера на авторизацию: ', res);
        if (res && res.token) { // Проверяем наличие токена в ответе
          localStorage.setItem('jwt', res.token); // Сохраняем токен в локальное хранилище
          mainApi.updateToken(); // Обновляем токен в заголовках запроса

          // Получаем информацию о пользователе
          mainApi.getUserInfo()
            .then((user) => {
              setLoggedIn(true); // Устанавливаем состояние входа в систему в true
              setCurrentUser(user); // Устанавливаем информацию о текущем пользователе
              navigate("/movies"); // Переходим на страницу с фильмами
            })
            .catch((err) => {
              console.log('Ошибка при получении данных пользователя: ', err);
            });
        }
      })
      .catch((err) => {
        console.log('Ошибка сервера при авторизации: ', err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>

          <Route path='/signup' element={<Register onRegister={handleRegister} />} />

          <Route path='/signin' element={<Login onLogin={handleLogin} />} />

          <Route path='/' element={<Main loggedIn={loggedIn} />} />
          <Route path='/movies' element={<Movies loggedIn={loggedIn} />} />
          <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn} />} />
          <Route path='/profile' element={<Profile loggedIn={loggedIn} />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
