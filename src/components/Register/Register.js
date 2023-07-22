import React from 'react';
import './Register.css';
import SignForm from '../SignForm/SignForm';
import mainApi from '../../utils/MainApi';

function Register({ onRegister}) {
//
//    const handleRegister = async ({ name, email, password }) => { 
//        try {
//            const response = await mainApi.register({ name, email, password }); // Ожидаем ответ API
//            onRegister(response); 
//        } catch (err) {
//            console.error(`Ошибка регистрации: ${err}`); 
//        }
//    }
    return (
        <SignForm
            isRegister={true}
            title="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            spanText="Уже зарегистрированы?"
            linkText="Войти"
            linkPath="/signin" 
            onSubmit={onRegister}
        />
    );
}

export default Register;
