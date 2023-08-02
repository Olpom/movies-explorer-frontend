import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { validateInput, validateEmail } from '../../utils/Validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function Profile({ openPopup, onLogOut, loggedIn }) {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    // Переменные состояния данных пользователя
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

    const [sentUserData, setSentUserData] = useState({ 
        name: '', 
        email: '' 
    }); 

    // Вывод ошибок с применением валидации
    const [userDataError, setUserDataError] = useState('');
    const disabled = !(userData.name && userData.email) || userDataError;

    // Инициализируем состояние загрузки
    const [isLoading, setIsLoading] = useState(true);

    console.log('start', currentUser);

    useEffect(() => {
        // Проверяем, есть ли данные пользователя, прежде чем обновлять состояние
        if (currentUser && currentUser.data) {
            setUserData({
                name: currentUser.data.name,
                email: currentUser.data.email,
            });
            setSentUserData({
                name: currentUser.data.name,
                email: currentUser.data.email,
            });
            setIsLoading(false);
        }
    }, [currentUser]);

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

        // Новый объект с данными пользователя
        const updatedUserData = {
            name: userData.name,
            email: userData.email,
        };

        // Проверяем, были ли внесены изменения
        if (userData.name === sentUserData.name && userData.email === sentUserData.email) {
            setEditMode(false);
            return;
        }

        // Если данные изменились, обновляем информацию пользователя
        mainApi.updateUserInfo(updatedUserData)
            .then((response) => {
                const updatedUser = response.data;
                setUserData({
                    name: updatedUser.name,
                    email: updatedUser.email,
                });
                setSentUserData({
                    name: updatedUser.name,
                    email: updatedUser.email,
                });
                setEditMode(false);
                console.log('updated', updatedUser);
                openPopup('Данные успешно изменены!');
                setCurrentUser(updatedUser);
            })
            .catch((err) => {
                console.log('Ошибка при обновлении данных пользователя: ', err);
                setUserDataError(err);
            });
    }

    console.log('end', currentUser);

    return (
        <div>
            <Header loggedIn={loggedIn} />
            <form className="profile"
                onSubmit={handleSubmit}
            >
                <h2 className="profile__greeting">{isLoading ? 'Загрузка...' : `Привет, ${userData.name}!`}</h2>
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
