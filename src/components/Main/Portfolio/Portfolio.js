import React from 'react';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <div className='portfolio__section'>
                <h4 className='portfolio__title'>Портфолио</h4>
                <a href='https://olpom.github.io/how-to-learn/' className='portfolio__link' target='_blank' rel='noreferrer'>
                    <p className='portfolio__subtitle'>Статичный сайт</p>
                    <p className='portfolio__arrow'>↗</p>
                </a>
                <a href='https://olpom.github.io/russian-travel/' className='portfolio__link' target='_blank' rel='noreferrer'>
                    <p className='portfolio__subtitle'>Адаптивный сайт</p>
                    <p className='portfolio__arrow'>↗</p>
                </a>
                <a href='olpom.github.io/react-mesto-auth/' className='portfolio__link' target='_blank' rel='noreferrer'>
                    <p className='portfolio__subtitle'>Одностраничное приложение</p>
                    <p className='portfolio__arrow'>↗</p>
                </a>
            </div>
        </section>
    )
}

export default Portfolio;
