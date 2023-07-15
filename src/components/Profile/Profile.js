import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { validateInput, validateEmail } from '../../utils/Validation';

function Profile({ loggedIn, onSubmit }) {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Виталий',
        email: 'pochta@yandex.ru',
    });

    // Временное решение для вывода ошибок с применением валидации
    const [userDataError, setUserDataError] = useState('');
    const disabled = !{ userData } || userDataError;

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    function handleInputChange(evt) {
        const { name, value } = evt.target;
        setUserData({
            ...userData,
            [name]: value,
        });
        // Применяем валидацию
        if (name === 'name') {
            setUserDataError(validateInput(value));
        } else if (name === 'email') {
            setUserDataError(validateEmail(value));
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        // Заглушка для обновления данных пользователя
        console.log('Пользователь обновлен:', {
            name: userData.name,
            email: userData.email
        });
        setEditMode(false);
        if (typeof onSubmit === 'function') {
            onSubmit(userData);
        }
    }

    function handleLogout() {
        // Заглушка для выхода из системы
        console.log('Пользователь вышел из системы');
        navigate('/');
    }


    return (
        <div>
            <Header loggedIn={loggedIn} />
            <form className="profile"
                onSubmit={handleSubmit}
            >
                <h2 className="profile__greeting">Привет, {userData.name}!</h2>
                <fieldset className="profile__user"
                    disabled={!editMode}
                >
                    <label className="profile__inputs">
                        <p className="profile__input">Имя</p>
                        <input
                            id="profile__name"
                            className="profile__text"
                            type="text"
                            name="name"
                            placeholder={userData.name}
                            value={userData.name}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                    </label>
                    <label className="profile__inputs">
                        <p className="profile__input">E-mail</p>
                        <input
                            id="profile__email"
                            className="profile__text"
                            type="text"
                            name="email"
                            placeholder={userData.email}
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                    </label>
                </fieldset >
                <div className="profile__buttons">
                    <span className="profile__error">{userDataError}</span>
                    {editMode ? (
                        <button
                            type="submit"
                            className={`profile__button profile__save-button ${disabled ? 'profile__save-button_disabled' : ''} ${editMode ? '' : 'profile__button_hidden'}`}
                            disabled={disabled}
                        >Сохранить</button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className={`profile__button profile__edit-button ${editMode ? 'profile__button_hidden' : ''}`}>Редактировать</button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className={`profile__button profile__exit-button ${editMode ? 'profile__button_hidden' : ''}`}>Выйти из аккаунта</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Profile;
