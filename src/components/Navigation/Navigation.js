import React, { useState } from 'react';
import './Navigation.css';
import '../Header/Header.css';
import { Link } from 'react-router-dom';

const LoggedIn = () => {
    const [isNavigationMenu, setIsNavigationMenu] = useState(false);

    const openNavigationMenu = () => setIsNavigationMenu(true);
    const closeNavigationMenu = () => setIsNavigationMenu(false);

    return (
        <>
            <ul className='navigation__menu'>
                <li><Link to='/movies' className='navigation__title navigation__title_active'>Фильмы</Link></li>
                <li><Link to='/saved-movies' className='navigation__title'>Сохранённые фильмы</Link></li>
            </ul>

            <div className='navigation__profile'>
                <Link to='/profile' className='navigation__link navigation__link_loggedin'>Аккаунт</Link>
                <Link to='/profile' className='navigation__button navigation__button_loggedin'></Link>
            </div>

            <button className='navigation__folded' onClick={openNavigationMenu}></button>

            <div className={`navigation__sidebar ${isNavigationMenu ? 'navigation__sidebar_opened' : ''}`} >
                <div className='navigation__sidebar-content'>
                    <ul className='navigation__sidebar-menu'>
                        <li className='navigation__sidebar-title'><Link to='/' className='navigation__sidebar-link'>Главная</Link></li>
                        <li className='navigation__sidebar-title navigation__sidebar-title_active'><Link to='/movies' className='navigation__sidebar-link'>Фильмы</Link></li>
                        <li className='navigation__sidebar-title'><Link to='/saved-movies' className='navigation__sidebar-link'>Сохранённые фильмы</Link></li>
                    </ul>
                    <div className='navigation__profile'>
                        <Link to='/profile' className='navigation__link navigation__link_loggedin'>Аккаунт</Link>
                        <Link to='/profile' className='navigation__button navigation__button_loggedin'></Link>
                    </div>
                    <button className='navigation__close-button' onClick={closeNavigationMenu}></button>
                </div>
            </div>
        </>
    );
};

const LoggedOut = () => (
    <div className='navigation__profile'>
        <Link to='/signup' className='navigation__link navigation__link_loggedout'>Регистрация</Link>
        <Link to='/signin' className='navigation__button navigation__button_loggedout'>Войти</Link>
    </div>
);

function Navigation({ loggedIn }) {
    return (
        <nav className={`navigation ${loggedIn ? '' : 'navigation_loggedout'}`}>
            {loggedIn ? <LoggedIn /> : <LoggedOut />}
        </nav>
    )
};

export default Navigation;
