import React, { useState } from 'react';
import './SignForm.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import { validateInput, validateEmail, validatePassword } from '../../utils/Validation';

function SignForm(props) {
    const { title, buttonText, spanText, linkText, linkPath, onSubmit } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // переменные для вывод ошибок валидации
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const disabled = !name || nameError ||!email || emailError || !password || passwordError;

    function handleName(evt) {
        const { value } = evt.target;
        setName(value);
        setNameError(validateInput(value));
    }

    function handleEmail(evt) {
        const { value } = evt.target;
        setEmail(value);
        setEmailError(validateEmail(value));
    }

    function handlePassword(evt) {
        const { value } = evt.target;
        setPassword(value);
        setPasswordError(validatePassword(value));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({ name, email, password });
    }

    return (
        <form
            noValidate
            className="form"
            name="signform"
            onSubmit={handleSubmit}
        >
            <div className="form__intro">
                <Link to="/"><img className="form__logo" src={logo} alt="Логотип" /></Link>
                <h3 className="form__title">{title}</h3>
            </div>
            <div className="form__container">
                <fieldset className="form__inputs">
                    <label className="form__label">
                        <p className="form__text">Имя</p>
                        <input
                            type="text"
                            className="form__input"
                            id="name"
                            name="name"
                            required=""
                            placeholder="Имя"
                            value={name}
                            onChange={handleName} />
                    </label>
                        <span className={`input__error name-error ${nameError && 'input__error_active'}`}>{nameError}</span>
                    <label className="form__label">
                        <p className="form__text">E-mail</p>
                        <input
                            type="email"
                            className="form__input"
                            id="email"
                            name="email"
                            required=""
                            placeholder="Email"
                            value={email}
                            onChange={handleEmail} />
                    </label>
                        <span className={`input__error email-error ${emailError && 'input__error_active'}`}>{emailError}</span>
                    <label className="form__label">
                        <p className="form__text">Пароль</p>
                        <input
                            type="password"
                            className="form__input"
                            id="password"
                            name="password"
                            required=""
                            placeholder="Пароль"
                            minLength={8}
                            maxLength={20}
                            value={password}
                            onChange={handlePassword} />
                    </label>
                        <span className={`input__error password-error ${passwordError && 'input__error_active'}`}>{passwordError}</span>
                </fieldset>

                <div className="form__submit">
                    <button
                        className={`form__submit-button ${disabled ? 'popup__submit-button_disabled' : ''}`}
                        type="submit"
                        disabled={disabled}>
                        {buttonText}
                    </button>
                    <span className="form__subtitle">{spanText}<Link to={linkPath} className="form__link">{linkText}</Link></span>
                </div>
            </div>
        </form>
    )
}

export default SignForm;
