import React, { useState } from "react";
import './MoviesCard.css';
import movie from '../../../images/movie-image.png';

function MoviesCard() {
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    }

    return (
        <li>
            <img className="moviescard__image" alt="Фильм" src={movie} />
            <div className="moviescard__description">
                <div className="moviescard__text">
                    <h2 className="moviescard__title">33 слова о дизайне</h2>
                    <button className={`moviescard__button ${isSaved ? 'moviescard__button_saved' : ''}`} onClick={handleSaveClick}></button>
                </div>
                <div className="moviescard__border"></div>
                <h3 className="moviescard__length">2ч42м</h3>
            </div>
        </li>
    )
}

export default MoviesCard;
