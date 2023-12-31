import React from "react";
import './MoviesCard.css';
import { useLocation } from "react-router-dom";
import { MOVIE_HOUR_IN_MINUTES } from '../../../utils/constants';

function MoviesCard({ movie, handleSavedMovie }) {

    const location = useLocation();
    const buttonClass = movie.saved ? " moviescard__button_saved moviescard__button" : "moviescard__button";

    // Вычисление длительности фильма
    const hourDuration = movie.duration >= MOVIE_HOUR_IN_MINUTES ? `${Math.floor(movie.duration / MOVIE_HOUR_IN_MINUTES)} ч ` : '';
    const minuteDuration = movie.duration === MOVIE_HOUR_IN_MINUTES ? '' : `${movie.duration % MOVIE_HOUR_IN_MINUTES} м`;
    const movieDuration = hourDuration + minuteDuration;

    const savedMovie = () => handleSavedMovie(movie);

    return (
        <li className="moviescard__card">
            <div className="moviescard__description">
                <div className="moviescard__text">
                    <h2 className="moviescard__title">{movie.nameRU}</h2>
                    <h3 className="moviescard__length">{movieDuration}</h3>
                </div>
                {(location.pathname === "/movies") &&
                    <button
                        className={buttonClass}
                        onClick={savedMovie}></button>}
                {(location.pathname === "/saved-movies") &&
                    <button
                        className="moviescard__button_delete"
                        onClick={savedMovie}></button>}
            </div>
            <a href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="moviescard__trailerlink">
                <img className="moviescard__image"
                    alt={movie.nameRU}
                    src={movie.thumbnail} />
            </a>
        </li>
    )
}

export default MoviesCard;
