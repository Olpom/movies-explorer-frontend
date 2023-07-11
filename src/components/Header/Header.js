import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

    const headerClass = (
        `header ${loggedIn ? 'header_movie' : 'header_main'}`
    )

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
