import React from 'react';
import './Techs.css'

function Techs() {
    return (
        <section className='techs' id='techs'>
            <div className='techs__heading'>
                <h2 className='techs__title'>Технологии</h2>
            </div>
            <div className='techs__description'>
                <h2 className='techs__subtitle'>7 технологий</h2>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className='techs__list'>
                <li className='techs__list-item'><p className='techs__list-text'>HTML</p></li>
                <li className='techs__list-item'><p className='techs__list-text'>CSS</p></li>
                <li className='techs__list-item'><p className='techs__list-text'>JS</p></li>
                <li className='techs__list-item'><p className='techs__list-text'>React</p></li>
                <li className='techs__list-item'><p className='techs__list-text'>Git</p></li>
                <li className='techs__list-item'><p className='techs__list-text'>Express.js</p></li>
                <li className='techs__list-item'><p className='techs__list-text'>mongoDB</p></li>
            </ul>
        </section>
    )
}

export default Techs;
