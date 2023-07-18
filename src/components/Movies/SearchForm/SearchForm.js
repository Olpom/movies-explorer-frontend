import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import icon from '../../../images/search-icon.svg';


function SearchForm() {
    return (
        <div className="searchform">
            <div className="searchform__container">
                <form className="searchform__form">
                    <img src={icon} alt='Поиск' className="searchform__icon"></img>
                    <input
                        className="searchform__input"
                        placeholder="Фильм"
                        required
                    />
                    <button className="searchform__button">Найти</button>
                </form>
                <div className="searchform__border"></div>
                <div className="searchform__checkbox">
                    <FilterCheckbox />
                    <p className="searchform__text">Короткометражки</p>
                </div>
            </div>
            <div className="searchform__bottom-border"></div>
        </div>
    )
}

export default SearchForm;
