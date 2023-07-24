import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';

function SavedMovies({ loggedIn }) {

    const [loadingStatus, setLoadingStatus] = useState(false);

    // Переменные состояния фильмов
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    // Фильтр фильмов
    const filterMovies = (search) => {
        setFilteredMovies(movies.filter((movie) => {
            const isMovieTitle = movie.nameRU.toLowerCase().includes(search.name.toLowerCase());
            const isShortMovie = search.isShortMovie ? movie.duration <= 40 : true;
            return isMovieTitle && isShortMovie;
        }))
    }

    useEffect(() => {
        mainApi.updateToken();
        setLoadingStatus(true);
        const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || '[]');
        if (savedMovies.length === 0) {
            mainApi.getMovies()
                .then((serverMovies) => {
                    localStorage.setItem('saved-movies', JSON.stringify(serverMovies.data));
                    setMovies(serverMovies.data);
                    setFilteredMovies(serverMovies.data);
                    setLoadingStatus(false);
                });
        } else {
            setMovies(savedMovies);
            setFilteredMovies(savedMovies);
            setLoadingStatus(false);
        }
    }, [])

    const handleSavedMovie = (movie) => {
        mainApi.deleteMovies(movie._id)
            .then(() => {
                setFilteredMovies((savedMovies) => {
                    const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');
                    const editedLocalMovies = localMovies.map((localmovie) => {
                        if (localmovie.id === movie.movieId) {
                            localmovie.saved = false;
                        }
                        return localmovie;
                    })
                    localStorage.setItem('local-movies', JSON.stringify(editedLocalMovies));
                    const filteredSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== movie._id);
                    localStorage.setItem('saved-movies', JSON.stringify(filteredSavedMovies));
                    return filteredSavedMovies;
                })
            })
    }

    return (
        <section className="savedmovies">
            <Header loggedIn={loggedIn} />

            <SearchForm
                filterMovies={filterMovies}
                required={false}
                page="saved-movies" />

            <MoviesCardList
                movies={filteredMovies}
                handleSavedMovie={handleSavedMovie}
                loadingStatus={loadingStatus} />

            <Footer />
        </section>
    );
}

export default SavedMovies;
