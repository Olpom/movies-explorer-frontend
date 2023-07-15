import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn }) {

    return (
        <section className="savedmovies">
            <Header loggedIn={loggedIn} />
            <SearchForm />
            <MoviesCardList isSavedMoviesPage={true} />
            <div className="movies__add-button savedmovies__add-button">
                <button className="movies__button movies__button_hidden">Ещё</button>
            </div>
            <Footer />
        </section>
    );
}

export default SavedMovies;
