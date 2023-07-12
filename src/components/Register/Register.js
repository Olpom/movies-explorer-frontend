import React from 'react';
import './Register.css';
import SignForm from '../SignForm/SignForm';

function Register() {
    return (
        <SignForm
            isRegister={true}
            title="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            spanText="Уже зарегистрированы?"
            linkText="Войти"
            linkPath="/signin"
        />
    );
}

export default Register;
