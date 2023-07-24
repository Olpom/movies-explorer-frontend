import React from 'react';
import SignForm from '../SignForm/SignForm';

function Login({ onLogin }) {
    return (
        <SignForm
            isRegister={false}
            title="Рады видеть!"
            buttonText="Войти"
            spanText="Ещё не зарегистрированы?"
            linkText="Регистрация"
            linkPath="/signup" 
            onSubmit={onLogin}
        />
    );
}

export default Login;
