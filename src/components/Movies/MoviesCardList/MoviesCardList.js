import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, handleSavedMovie, searchQuery, loadingStatus }) {

    return (
        <section className="moviescards">
            {loadingStatus && <Preloader />}
            <ul className="moviescards__list">
                {movies.map((movie) =>
                    <MoviesCard
                        key={movie.movieId}
                        movie={movie}
                        handleSavedMovie={handleSavedMovie} />)}
                {(movies.length === 0 && searchQuery && !loadingStatus) &&
                    <li >
                        <span className="moviescardlist__notfound">Ничего не найдено</span>
                    </li>
                }
            </ul>
        </section>
    )
}

export default MoviesCardList;
