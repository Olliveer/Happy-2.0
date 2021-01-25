import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import SideLogin from '../../components/PageLogin/PageLogin';
import { useAuth } from '../../contexts/auth';

import './login.css';

function SignIn() {
    const { goBack } = useHistory();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remindMe, setRemindMe] = useState(true);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        signIn(email, password);
    }

    return (
        <div id="login-page">
            <SideLogin />

            <aside className="form-box">
                <form onSubmit={handleSubmit} className="login-form">
                    <fieldset>
                        <legend>Fazer login</legend>
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="password">Senha</label>
                            <input
                                id="password"
                                value={password}
                                type="password"
                                onChange={event => setPassword(event.target.value)} />
                        </div>
                        <div className="remember-me">
                            <input id="checkbox" type="checkbox" name="checked"></input>
                            <label htmlFor="remember">Lembrar-me</label>

                            <Link to="/recover" className="forgot-password">
                                Esqueci a senha
							</Link>
                        </div>

                    </fieldset>

                    <button disabled={false} className="confirm-button" type="submit">
                        Entrar
                    </button>

                </form>




                <button type="button" className="back-btn" onClick={goBack}>
                    <FiArrowLeft size={16} color="#15C3D6" />
                </button>
            </aside>
        </div>
    );
}

export default SignIn;