import React from 'react';

import './page-login.css';

import LogoLogin from '../../images/logoHappy.svg';

function PageLogin() {
    return (
        <aside className="page-login">
            <img src={LogoLogin} />

            <div className="location">
                <strong>Curitiba</strong>
                <span>Paraná</span>
            </div>
        </aside>
    );
}

export default PageLogin;