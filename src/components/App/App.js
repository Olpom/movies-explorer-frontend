import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
/*
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Page404 from '../Page404/Page404';
*/

function App() {

  // переменные состояния для отслеживания состояния аутентификации пользователя
  const [loggedIn, setLoggedIn] = useState(true);
  //const [signedIn, setSignedIn] = useState(true);

  return (
    <div className='app'>
      <Routes>
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;

/* 
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route path='/movies' element={<Movies loggedIn={loggedIn} />} />
        <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn} />} />
        <Route path='/profile' element={<Profile loggedIn={loggedIn} />} />
        <Route path='/*' element={<Page404 />} />
 
        */