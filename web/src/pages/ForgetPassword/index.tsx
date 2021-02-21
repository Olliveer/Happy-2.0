import React, { useState } from 'react';

import './recovery.css';

import SideRecovery from '../../components/PageLogin/PageLogin';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';




export function ForgetPassword() {
    const { goBack } = useHistory();
    const [email, setEmail] = useState('');


    function handleSubmit() {

    }

    return (
        <div id="recovery-page">
            <SideRecovery />

            <aside className="form-box">
                <form onSubmit={handleSubmit} className="login-form">
                    <fieldset>
                        <legend>Esqueci a senha</legend>
                        <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

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