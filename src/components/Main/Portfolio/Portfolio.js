import React from 'react';
import link from '../../../img/link-min.png';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <a href="https://mariagrom.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel="noreferrer">
        <p  className="portfolio__subtitle">Статичный сайт</p>
        <img className="portfolio__img" src={link} alt="Ссылка" />
      </a>
      <a href="https://mariagrom.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">
        <p className="portfolio__subtitle">Адаптивный сайт</p>
        <img className="portfolio__img" src={link} alt="Ссылка" />
      </a>
      <a href="https://mariagrom.github.io/mesto/" className="portfolio__link" target="_blank" rel="noreferrer">
        <p className="portfolio__subtitle">Одностраничное приложение</p>
        <img className="portfolio__img" src={link} alt="Ссылка" />
      </a>
    </section>
  )
}

export default Portfolio