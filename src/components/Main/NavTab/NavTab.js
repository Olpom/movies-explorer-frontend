import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <section className='navtab'>
            <ul className='navtab__menu'>
                <li className='navtab__menu-item'><a href='#aboutproject' className='navtab__menu-link'>О проекте</a></li>
                <li className='navtab__menu-item'><a href='#techs' className='navtab__menu-link'>Технологии</a></li>
                <li className='navtab__menu-item'><a href='#aboutme' className='navtab__menu-link'>Студент</a></li>
            </ul>
        </section>
    );
}

export default NavTab;
