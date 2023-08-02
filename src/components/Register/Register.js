import React from 'react';
import SignForm from '../SignForm/SignForm';

function Register({ onRegister }) {
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
