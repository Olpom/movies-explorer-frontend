import React, { useState, useRef, useEffect } from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import '../FilterCheckbox/FilterCheckbox.css';
import icon from '../../../images/search-icon.svg';

function SearchForm({ filterMovies, required = true, page }) {

    // Переменная состояния кнопки поиска
    const [isDisabledButton, setIsDisabledButton] = useState(true);
    // Переменная состояния ошибки
    const [error, setError] = useState({ name: '', isShortMovie: '' });
    // Переменная состония поисковой строки
    const [value, setValue] = useState({ name: '', isShortMovie: false });

    const formRef = useRef(null);

    useEffect(() => {
        const searchMovies = JSON.parse(localStorage.getItem('search-movies'));
        if (searchMovies) {
            setValue(searchMovies);
            filterMovies(searchMovies);
        }
        if (page === 'saved-movies') {
            filterMovies({ name: '', isShortMovie: false });
            setValue({ name: '', isShortMovie: false });
        }
    }, []);

    const handleInputChange = (evt) => {
        const {
            name,
            value: inputValue,
            validationMessage
        } = evt.target;

        const updatedValue = {
            ...value,
            [name]: inputValue
        }
        if (page === 'movies') {
            localStorage.setItem('search-movies', JSON.stringify(updatedValue));
        }
        setValue(updatedValue);
        setError((state) => ({ ...state, [name]: validationMessage }));
        setIsDisabledButton(!formRef.current.checkValidity())
    };

    const handleCheckbox = (evt) => {
        const { name, checked } = evt.target;
        const updatedValue = { ...value, [name]: checked };

        if (page === 'movies') {
            localStorage.setItem('search-movies', JSON.stringify(updatedValue));
        }
        setValue(updatedValue);
        filterMovies(updatedValue);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        filterMovies(value);
    }

    return (
        <div className="searchform">
            <div className="searchform__container"  >
                <form className="searchform__form"
                    onSubmit={handleSubmit}
                    ref={formRef}
                    noValidate>
                    <img src={icon} alt='Поиск' className="searchform__icon"></img>
                    <input
                        type="text"
                        className="searchform__input"
                        placeholder="Фильм"
                        required={required}
                        onChange={handleInputChange}
                        value={value.name}
                        name="name"
                    />
                    <button
                        type="button"
                        className={`searchform__button ${isDisabledButton ? "searchform__button_disabled" : ""}`}
                        disabled={isDisabledButton}
                        onClick={handleSubmit}
                    >Найти</button>
                </form>
                <div className="searchform__border"></div>
                <div className="searchform__checkbox">

                    <FilterCheckbox
                        onChange={handleCheckbox}
                        checked={value.isShortMovie} />

                    <p className="searchform__text">Короткометражки</p>
                </div>
            </div>
            <span className="searchform__error">{error.name}</span>
            <div className="searchform__bottom-border"></div>
        </div>
    )
}

export default SearchForm;
