import React, { useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Token from '../../utils/token';

// Фильмы, отображаемые на экране
const moviesDisplay = () => {
    const display = {
        start: 12,
        load: 3
    }
    if (window.innerWidth < 990) {
        display.start = 8;
        display.load = 2;
    }
    if (window.innerWidth < 767) {
        display.start = 5;
        display.load = 1;
    }
    return display
}

function Movies({ loggedIn }) {

    const display = moviesDisplay();
    const [loadingStatus, setLoadingStatus] = useState(false);

    // Переменные состояния фильмов
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [displayedMovies, setDisplayedMovies] = useState(display.start);

    // Переменная поиска
    const [searchQuery, setSearchQuery] = useState(false);

    // Загружаем фильмы
    const uploadMovies = () => {
        const display = moviesDisplay();
        setDisplayedMovies(displayedMovies + display.load)
    }

    // Фильтр фильмов
    const filterMovies = (search) => {
        setSearchQuery(true)

        // Фильтр фильмов по названию и продолжительности
        const filter = (movies) => {
            setFilteredMovies(movies.filter((movie) => {
                const isMovieTitle = movie.nameRU.toLowerCase().includes(search.name.toLowerCase());
                const isShortMovie = search.isShortMovie ? movie.duration <= 40 : true;
                return isMovieTitle && isShortMovie;
            }))
        }
        if (movies.length === 0) {
            const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');

            if (localMovies.length === 0) {
                mainApi.updateToken();
                setLoadingStatus(true);
                Promise.all([moviesApi.getMovies(), mainApi.getMovies()])
                    .then(([beatFilms, { data: localFilms }]) => {
                        const mixedFilms = beatFilms.map(movie => {
                            const localMovie = localFilms.find((localMovie) => localMovie.movieId === movie.id);

                            // Задаем единое название для всех фильмов
                            movie._id = localMovie !== undefined ? localMovie._id : '';
                            movie.movieId = movie.id;
                            movie.thumbnail = `https://api.nomoreparties.co/${movie.image.url}`;
                            movie.saved = localMovie !== undefined;
                            return movie;
                        })
                        setMovies(mixedFilms);
                        filter(mixedFilms);

                        // Сохраняем Битфильмы в локальное хранилище
                        localStorage.setItem('local-movies', JSON.stringify(mixedFilms));
                        setLoadingStatus(false);
                    });
            } else {
                setMovies(localMovies);
                filter(localMovies);
            }
        } else {
            filter(movies);
            setDisplayedMovies(display.start)
        }
    }

    // Взаимодействие с карточкой фильма (удалить/сохранить)
    const handleSavedMovie = (movie) => {
        if (movie.saved) {
            mainApi.deleteMovies(movie._id)
                .then(() => {
                    setMovies((beatMovies) => {
                        const editedMovies = beatMovies.map(beatMovie => {
                            if (beatMovie._id === movie._id) {
                                beatMovie.saved = false;
                            }
                            return beatMovie;
                        })
                        localStorage.setItem('local-movies', JSON.stringify(editedMovies));
                        return editedMovies;
                    })
                    localStorage.removeItem('saved-movies');
                })
        } else {
            const recentMovie = {
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co/${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            }
            mainApi.addMovies(recentMovie)
                .then((serverMovie) => {
                    setMovies((beatMovies) => {
                        localStorage.removeItem('saved-movies');
                        const editedMovies = beatMovies.map(beatMovie => {
                            if (beatMovie.id === serverMovie.movieId) {
                                beatMovie.saved = true;
                                beatMovie._id = serverMovie._id;
                                beatMovie.movieId = serverMovie.movieId;
                                beatMovie.thumbnail = serverMovie.thumbnail;
                            }
                            return beatMovie;
                        })
                        localStorage.setItem('local-movies', JSON.stringify(editedMovies));
                        return editedMovies;
                    })
                })
        }
    }

    return (
        <>
            <section className="movies">
            <Header loggedIn={loggedIn} />

                <SearchForm
                    filterMovies={filterMovies}
                    page="movies" />

                <MoviesCardList
                    movies={filteredMovies.filter((_, i) => i < displayedMovies)}
                    handleSavedMovie={handleSavedMovie}
                    searchQuery={searchQuery}
                    loadingStatus={loadingStatus} />

                {(filteredMovies.length > displayedMovies) &&
                    <div className="movies__add-button">
                        <button className="movies__button"
                            onClick={uploadMovies} >Ещё</button>
                    </div>}

            <Footer />
            </section>
        </>
    );
}

export default Movies;
