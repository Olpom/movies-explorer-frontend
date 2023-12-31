import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Page404 from '../Page404/Page404';
import InfoPopup from '../InfoPopup/InfoPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import Token from '../../utils/token';

function App() {

  // Переменная состояния для отслеживания состояния аутентификации пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // Переменная состояния пользователя 
  const [currentUser, setCurrentUser] = useState({});
  // Переменные состояния попапа
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupText, setPopupText] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Token.getToken();
    if (token) {
      mainApi.updateToken();
      handleUserInfo()
        .then(() => {
          // После успешной аутентификации проверяем lastVisited
          const lastVisited = localStorage.getItem('lastVisited');
          if (lastVisited) {
            navigate(lastVisited);
          }
          setIsLoading(false);
        });
    } else if (localStorage.getItem('loggedIn')) {
      // Если нет токена, но пользователь в прошлом был авторизован, восстанавливаем его статус
      setLoggedIn(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Записываем текущую страницу в localStorage при каждом изменении маршрута
    if (loggedIn) {
      localStorage.setItem('lastVisited', location.pathname);
      // Также сохраняем состояние авторизации пользователя
      localStorage.setItem('loggedIn', 'true');
    }
  }, [location, loggedIn]);

  function handleUserInfo() {
    return mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log('Ошибка при получении данных пользователя: ', err);
      });
  }

  function handleRegister(userData) {
    return mainApi.register({
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
      .then((res) => {
        console.log('Ответ сервера на регистрацию: ', res);
        if (res && res.data) {
          setPopupText('Вы успешно зарегистрировались!');
          setIsOpenPopup(true);
          handleLogin(userData);
          console.log('Успешная регистрация: ', res && res.data);
        }
      })
      .catch((err) => {
        setPopupText(err);
        setIsOpenPopup(true);
        console.log('Ошибка сервера при регистрации: ', err);
      });
  }

  function handleLogin(userData) {
    return mainApi.login({
      email: userData.email,
      password: userData.password
    })
      .then(({ token }) => {
        console.log('Ответ сервера на авторизацию');
        if (token) {
          console.log('Token received: ', token);
          Token.saveToken(token);
          mainApi.updateToken();
          console.log('Headers after login: ', mainApi._headers);
          setLoggedIn(true);
          handleUserInfo();
          navigate('/movies');
        }
      })
      .catch((err) => {
        setPopupText(err);
        setIsOpenPopup(true);
        console.log('Ошибка сервера при авторизации: ', err);
      });
  }

  function openPopup(text) {
    setPopupText(text);
    setIsOpenPopup(true);
  }

  function closePopup() {
    setIsOpenPopup(false);
    setPopupText('');
  }

  // Функция выхода из аккаунта
  function handleLogOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser(null);
    mainApi.updateToken();
    navigate('/');
    console.log('Выход из аккаунта');
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className='app'>
        {!isLoading && (
          <>
            <Routes>

              <Route
                path='/signup'
                element={
                  <ProtectedRoute loggedIn={!loggedIn}>
                    <Register
                      onRegister={handleRegister}
                    />
                  </ProtectedRoute>} />

              <Route
                path='/signin'
                element={
                  <ProtectedRoute loggedIn={!loggedIn}>
                    <Login
                      onLogin={handleLogin} />
                  </ProtectedRoute>} />

              <Route
                path='/'
                element={
                  <Main loggedIn={loggedIn} />} />

              <Route
                path='/movies'
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Movies
                      loggedIn={loggedIn} />
                  </ProtectedRoute>} />

              <Route
                path='/saved-movies'
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <SavedMovies loggedIn={loggedIn} />
                  </ProtectedRoute>} />

              <Route
                path='/profile'
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      loggedIn={loggedIn}
                      onLogOut={handleLogOut}
                      openPopup={openPopup}
                    />
                  </ProtectedRoute>} />

              <Route
                path='/*'
                element={
                  <ProtectedRoute loggedIn={!loggedIn}>
                    <Page404 />
                  </ProtectedRoute>
                } />

            </Routes>
            <InfoPopup text={popupText} isOpen={isOpenPopup} onClose={closePopup} />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
