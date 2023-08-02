import React from 'react';
import './Page404.css';
import { useNavigate } from 'react-router-dom';

function Page404() {
    const navigate = useNavigate();

    return (
        <div className="page-notfound">
            <h2 className="page-notfound__title">404</h2>
            <p className="page-notfound__subtitle">Страница не найдена</p>
            <button
                onClick={() => navigate(-1)}
                className="page-notfound__link">Назад</button>
        </div>
    )
}

export default Page404;
