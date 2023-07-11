import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
/*
import Footer from '../Footer/Footer';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
*/

function Main() {
    return (
        <main className='main'>
            <Header />
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
        </main>
    );
}

export default Main;
