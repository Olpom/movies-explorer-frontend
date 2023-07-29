import React from 'react';
import './AboutMe.css';
import avatar from '../../../images/profile-image.JPG';

function AboutMe() {
    return (
        <section className='aboutme' id='aboutme'>
            <div className='aboutme__section'>
                <div className='aboutme__heading'>
                    <h2 className='aboutme__title'>Студент</h2>
                </div>
                <div className='aboutme__profile'>
                    <div className='aboutme__description'>
                        <h3 className='aboutme__name'>Ольга</h3>
                        <p className='aboutme__job'>Фронтенд-разработчик, 29 лет</p>
                        <p className='aboutme__text'>Я родилась и живу в Санкт-Петербурге. Окончила Горный Университет по специальности "Менеджер проектов" и получила степень магистра в Московской Международной Академии по направлению "Лингвистика и педагогика".  Веб-разработка стала идеальным продолжением моего образа жизни, именно здесь я могу применить все свои навыки, прошлый опыт и получать удовольствие от рабочего процесса.</p>
                        <a className='aboutme__link' href='https://github.com/Olpom' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                    <img className='aboutme__avatar' src={avatar} alt='Аватар' />
                </div>
            </div>
        </section >
    )
}

export default AboutMe;
