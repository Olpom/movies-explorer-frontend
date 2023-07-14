import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
/*
import Footer from '../Footer/Footer';
*/


function Movies({ loggedIn }) {

    return (
        <section className="movies">
            <Header loggedIn={loggedIn} />
            <SearchForm />
            <MoviesCardList />
            <div className="movies__add-button">
                <button className="movies__button">Ещё</button>
            </div>

        </section>
    );
}

export default Movies;

/*
<SearchForm />
<MoviesCardList />

<Footer />
*/
