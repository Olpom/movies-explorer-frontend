import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { validateInput, validateEmail } from '../../utils/Validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function Profile({ openPopup, onLogOut, loggedIn }) {

    const currentUser = useContext(CurrentUserContext);

    // Переменные состояния данных пользователя
    const [name, setName] = useState(currentUser.data.name);
    const [email, setEmail] = useState(currentUser.data.email);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        name: currentUser.data.name,
        email: currentUser.data.email,
    });

    // Вывод ошибок с применением валидации
    const [userDataError, setUserDataError] = useState('');
    const disabled = !{ userData } || userDataError;

    console.log(currentUser); // Выводим в консоль объект currentUser

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser.name, currentUser.email]);

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
        mainApi.updateUserInfo(userData)
            .then((response) => {
                const updatedUser = response.data;
                setUserData(updatedUser);;
                setEditMode(false);
                openPopup('Данные успешно изменены!');
            })
            .catch((err) => {
                console.log('Ошибка при обновлении данных пользователя: ', err);
                setUserDataError('Ошибка при обновлении данных. Попробуйте еще раз.');
            });
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
                            className={`profile__button profile__save-button ${disabled ? 'profile__save-button_disabled' : ''}`}
                            disabled={disabled}
                        >Сохранить</button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="profile__button profile__edit-button">Редактировать</button>
                            <button
                                type="button"
                                onClick={onLogOut}
                                className="profile__button profile__exit-button">Выйти из аккаунта</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Profile;
