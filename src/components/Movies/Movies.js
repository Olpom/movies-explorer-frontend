import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

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

    // Обновление локального хранилища при изменении состояния movies
    useEffect(() => {
        localStorage.setItem('local-movies', JSON.stringify(movies));
    }, [movies]);

    // Загружаем фильмы
    const uploadMovies = () => {
        const display = moviesDisplay();
        setDisplayedMovies(displayedMovies + display.load)
    }

    // Фильтр фильмов
    const filterMovies = (search) => {
        setSearchQuery(true);

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

                console.log('Шаг1 localMovies.length', JSON.stringify(localMovies));

                mainApi.updateToken();
                setLoadingStatus(true);
                Promise.all([moviesApi.getMovies(), mainApi.getMovies()])
                    .then(([beatFilms, { data: localFilms }]) => {

                        console.log('Шаг2 beatFilms after Promise:', beatFilms, 'data:', localFilms);

                        const mixedFilms = beatFilms.map(movie => {
                            const localMovie = localFilms.find((localMovie) => localMovie.movieId === movie.id);

                            console.log('Шаг3 localMovie', localMovie);

                            // Задаем единое название для всех фильмов
                            movie._id = localMovie !== undefined ? localMovie._id : '';
                            movie.movieId = movie.id;
                            movie.thumbnail = `https://api.nomoreparties.co/${movie.image.url}`;
                            movie.saved = localMovie !== undefined;
                            return movie;
                        })
                        console.log('Шаг4 movie ID', mixedFilms);
                        setMovies(mixedFilms);

                        filter(mixedFilms);

                        // Сохраняем Битфильмы в локальное хранилище
                        localStorage.setItem('local-movies', JSON.stringify(mixedFilms));

                        //setMovies(mixedFilms);

                        console.log('Шаг5 mixedFilms', mixedFilms);
                        setLoadingStatus(false);
                    });
            } else {
                setMovies(localMovies);
                filter(localMovies);
                console.log('Шаг6 localMovies', localMovies);
            }
        } else {
            filter(movies);
            setDisplayedMovies(display.start);
            console.log('Шаг7 setDisplayedMovies', movies);
        }
    }

    // Взаимодействие с карточкой фильма (удалить/сохранить)
    const handleSavedMovie = (movie) => {
        if (movie.saved) {
            console.log('Шаг8 movie.saved', movie.saved);
            //mainApi.updateToken();
            mainApi.deleteMovies(movie._id)
                .then(() => {
                    console.log('Шаг9 movie._id', movie._id);
                    setMovies((beatMovies) => {
                        const editedMovies = beatMovies.map(beatMovie => {
                            if (beatMovie._id === movie._id) {
                                beatMovie.saved = false;
                            }
                            return beatMovie;
                        });
                        console.log('Шаг10 editedMovies', editedMovies);
                        localStorage.setItem('local-movies', JSON.stringify(editedMovies));

                        console.log('Шаг11 editedMovies', editedMovies);
                        return editedMovies;
                    })
                    localStorage.removeItem('saved-movies');
                })
                .catch((err) => {
                    console.error('Ошибка удаления фильма: ', err);
                });
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
            console.log('Шаг12 recentMovie', recentMovie);
            //mainApi.updateToken();
            mainApi.addMovies(recentMovie)
                .then((serverMovie) => {

                    console.log('Шаг13 serverMovie Присвоен _id', serverMovie);

                    setMovies((beatMovies) => {
                        localStorage.removeItem('saved-movies');

                        console.log('Шаг14 saved-movies', beatMovies);

                        const editedMovies = beatMovies.map(beatMovie => {
                            if (beatMovie.movieId === serverMovie.newMovie.movieId) {
                                beatMovie.saved = true;
                                beatMovie._id = serverMovie.newMovie._id;
                                beatMovie.movieId = serverMovie.newMovie.movieId;
                                beatMovie.thumbnail = serverMovie.newMovie.thumbnail;
                            }
                            return beatMovie;
                        })
                        console.log('Шаг15 Saved beatMovie', editedMovies);

                        localStorage.setItem('local-movies', JSON.stringify(editedMovies));

                        console.log('Шаг16 Saved local-movies', editedMovies);

                        return editedMovies;
                    })

                })
                .catch((err) => {
                    console.error('Ошибка добавления фильма: ', err);
                });
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
