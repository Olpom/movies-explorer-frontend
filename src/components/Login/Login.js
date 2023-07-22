import React from 'react';
import SignForm from '../SignForm/SignForm';
import mainApi from '../../utils/MainApi';

function Login({ onLogin }) {
   // const handleLogin = async ({ email, password}) => {
   //     try {
   //         const response = await mainApi.login({ email, password}); // Ожидаем ответ API
   //         onLogin(response); 
   //     } catch (err) {
   //         console.error(`Ошибка входа: ${err}`); 
   //     }
   // }
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
