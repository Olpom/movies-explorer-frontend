import React from 'react';
import './Page404.css';
import { Link } from 'react-router-dom';

function Page404() {
    return (
        <div className="page-notfound">
            <h2 className="page-notfound__title">404</h2>
            <p className="page-notfound__subtitle">Страница не найдена</p>
            <Link to="/" className="page-notfound__link">Назад</Link>
        </div>
    )
}

export default Page404;
