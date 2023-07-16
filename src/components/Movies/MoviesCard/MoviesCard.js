import React, { useState } from "react";
import './MoviesCard.css';
import movie from '../../../images/movie-image.png';

function MoviesCard({ isSavedMoviesPage }) {
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    }

    return (
        <li className="moviescard__card">
            <div className="moviescard__description">
                <div className="moviescard__text">
                    <h2 className="moviescard__title">33 слова о дизайне</h2>
                    <h3 className="moviescard__length">2ч42м</h3>
                </div>
                <button
                    className={`moviescard__button ${isSavedMoviesPage ? 'moviescard__button_delete' : (isSaved ? 'moviescard__button_saved' : '')}`}
                    onClick={handleSaveClick}
                >
                </button>
            </div>
            <img className="moviescard__image" alt="Фильм" src={movie} />
        </li>
    )
}

export default MoviesCard;
