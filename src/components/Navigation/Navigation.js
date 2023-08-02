import React, { useState } from 'react';
import './Navigation.css';
import '../Header/Header.css';
import { Link, useLocation } from 'react-router-dom';

const LoggedIn = () => {
    const location = useLocation();
    const [isNavigationMenu, setIsNavigationMenu] = useState(false);

    const openNavigationMenu = () => setIsNavigationMenu(true);
    const closeNavigationMenu = () => setIsNavigationMenu(false);

    return (
        <>
            <ul className='navigation__menu'>
                <li>
                    <Link to='/movies'
                        className={`navigation__title ${location.pathname === '/movies' ? 'navigation__title_active' : ''}`}>Фильмы</Link>
                </li>
                <li>
                    <Link to='/saved-movies' className={`navigation__title ${location.pathname === '/saved-movies' ? 'navigation__title_active' : ''}`}>Сохранённые фильмы</Link>
                </li>
            </ul>

            <div className='navigation__profile-decoration'>
                <Link to='/profile' className='navigation__link navigation__link-loggedin'>Аккаунт</Link>
                <Link to='/profile' className='navigation__button navigation__button-loggedin'></Link>
            </div>

            <button className='navigation__folded' onClick={openNavigationMenu}></button>

            <div className={`navigation__sidebar ${isNavigationMenu ? 'navigation__sidebar_opened' : ''}`} >
                <div className='navigation__sidebar-content'>
                    <ul className='navigation__sidebar-menu'>
                        <li className='navigation__sidebar-title'>
                            <Link to='/' className='navigation__sidebar-link'>Главная</Link>
                        </li>
                        <li className={`navigation__sidebar-title ${location.pathname === '/movies' ? 'navigation__sidebar-title_active' : ''}`}>
                            <Link to='/movies' className='navigation__sidebar-link'>Фильмы</Link>
                        </li>
                        <li className={`navigation__sidebar-title ${location.pathname === '/saved-movies' ? 'navigation__sidebar-title_active' : ''}`}><Link to='/saved-movies' className='navigation__sidebar-link'>Сохранённые фильмы</Link></li>
                    </ul>
                    <div className='navigation__profile'>
                        <Link to='/profile' className='navigation__link navigation__link-loggedin'>Аккаунт</Link>
                        <Link to='/profile' className='navigation__button navigation__button-loggedin'></Link>
                    </div>
                    <button className='navigation__close-button' onClick={closeNavigationMenu}></button>
                </div>
            </div>
        </>
    );
};

const LoggedOut = () => (
    <div className='navigation__profile'>
        <Link to='/signup' className='navigation__link navigation__link-loggedout'>Регистрация</Link>
        <Link to='/signin' className='navigation__button navigation__button-loggedout'>Войти</Link>
    </div>
);

function Navigation({ loggedIn }) {
    const location = useLocation();
    let navClasses = 'navigation';
    if (loggedIn) {
        navClasses += location.pathname === '/' ? ' navigation__main-loggedin' : '';
    } else {
        navClasses += ' navigation_loggedout';
    }
    return (
        <nav className={navClasses}>
            {loggedIn ? <LoggedIn /> : <LoggedOut />}
        </nav>
    )
};

export default Navigation;
