import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

    const location = useLocation();

    const headerClass = (location.pathname === '/') ? 'header header_main' : 'header header_movie';

    return (
        <header className={headerClass}>
            <Link to='/'>
                <img className='header__logo' src={logo} alt='Логотип' />
            </Link>
            <Navigation loggedIn={loggedIn} />
        </header>
    );
}

export default Header;
