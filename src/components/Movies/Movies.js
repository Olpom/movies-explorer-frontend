import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ loggedIn }) {

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="movies">
                <SearchForm />
                <MoviesCardList isSavedMoviesPage={false} />
                <div className="movies__add-button">
                    <button className="movies__button">Ещё</button>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Movies;
