import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


function SearchForm() {
    return (
        <div className="searchform">
            <div className="searchform__container">
                <form className="searchform__form">
                    <input
                        className="searchform__input"
                        placeholder="Фильм"
                        required=""
                    />
                    <button className="searchform__button"></button>
                </form>
                <div className="searchform__checkbox">
                    <p className="searchform__text">Короткометражки</p>
                    <FilterCheckbox />
                </div>
            </div>
            <div className="searchform__border"></div>
        </div>
    )
}

export default SearchForm;
