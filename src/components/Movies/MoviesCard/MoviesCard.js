import React from "react";
import './MoviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, handleSavedMovie }) {

    const location = useLocation();
    const buttonClass = movie.saved ? " moviescard__button_saved moviescard__button" : "moviescard__button";

    // Вычисление длительности фильма
    const hourDuration = movie.duration >= 60 ? `${Math.floor(movie.duration / 60)} ч ` : '';
    const minuteDuration = movie.duration === 60 ? '' : `${movie.duration % 60} м`;
    const movieDuration = hourDuration + minuteDuration;

    const savedMovie = () => handleSavedMovie(movie);

    return (
        <li className="moviescard__card">
            <a href={movie.trailerLink}
                target="_blank"
                className="moviescard__trailerlink"
                rel="noreferrer">
                <img className="moviescard__image"
                    alt={movie.nameRU}
                    src={movie.thumbnail} />
            </a>
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
        </li>
    )
}

export default MoviesCard;
