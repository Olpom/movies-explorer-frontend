import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSavedMoviesPage }) {

    return (
        <section className="moviescards">
            <ul className="moviescards__list">
                <MoviesCard isSavedMoviesPage={isSavedMoviesPage} />
                <MoviesCard isSavedMoviesPage={isSavedMoviesPage} />
                <MoviesCard isSavedMoviesPage={isSavedMoviesPage} />
                <MoviesCard isSavedMoviesPage={isSavedMoviesPage} />
            </ul>
        </section>
    )
}

export default MoviesCardList;
