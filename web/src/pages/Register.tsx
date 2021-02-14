import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";


import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";



export default function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // async function handleSubmitRegisterUser(event: FormEvent) {
    //     event.preventDefault();

    //     const data = new FormData();
    //     data.append('name', name);
    //     data.append('email', email);
    //     data.append('password', password);

    //     console.log(name, email, password);


    //     await api.post('register', JSON.stringify(data));

    //     alert('Cadastro realizado com sucesso');
    //     history.push('/app');

    // }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const data = { name: name, email: email, password: password };

        fetch('http://localhost:3333/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (!response.ok) {
               alert('User already registered');
               history.push('/user/create');
            }
            alert('Successfully registered')
            history.push('/app');
            return response.json()
        })
        .then(user => {       
             console.log(user)
         })

    }

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Dados</legend>
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="email">Email</label>
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

                    </fieldset>



                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}
