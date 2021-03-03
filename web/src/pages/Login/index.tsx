import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Loader from 'react-loader-spinner';
import { Link, useHistory } from 'react-router-dom';
import SideLogin from '../../components/PageLogin/PageLogin';
import { useAuth } from '../../contexts/auth';
import ToastAnimated, { showToast } from '../../utils/Toast/toast';
import './login.css';


function SignIn() {
    const { goBack } = useHistory();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remindMe, setRemindMe] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        signIn(email, password).catch(err => showToast({ type: "warn", message: err.response.data.message }))
        setLoading(false);
    }

    return (
        <div id="login-page">
            <ToastAnimated />
            <SideLogin />

            <aside className="form-box">

                <form onSubmit={handleSubmit} className="login-form">
                    <fieldset>
                        <legend>Fazer login</legend>
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input
                                style={
                                    email ? { borderColor: '#A1E9C5' } : { borderColor: '#D3E2E5' }
                                }
                                type="email"
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="password">Senha</label>
                            <input
                                style={
                                    password
                                        ? { borderColor: '#A1E9C5' }
                                        : { borderColor: '#D3E2E5' }
                                }
                                id="password"
                                value={password}
                                type="password"
                                onChange={event => setPassword(event.target.value)} />
                        </div>
                    </fieldset>
                    <div className="remember-me">
                        <input id="checkbox" type="checkbox" onClick={() => setRemindMe(!remindMe)}></input>
                        <label htmlFor="remember">Lembrar-me</label>

                        <Link to="/recovery" className="forgot-password">
                            Esqueci a senha
						</Link>
                    </div>

                    <button disabled={false} className="confirm-button" type="submit">
                        {!loading ? (
                            // <FiCheck size={24} color="#FFF" />
                            'Entrar'
                        ) : (
                                <Loader type="Puff" color="#FFF" height={40} width={40} />
                            )}
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