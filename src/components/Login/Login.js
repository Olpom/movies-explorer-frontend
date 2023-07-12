import React from 'react';
import './Login.css';
import SignForm from '../SignForm/SignForm';

function Login() {
    return (
        <SignForm
            isRegister={false}
            title="Рады видеть!"
            buttonText="Войти"
            spanText="Ещё не зарегистрированы?"
            linkText="Регистрация"
            linkPath="/signup"
        />
    );
}

export default Login;
