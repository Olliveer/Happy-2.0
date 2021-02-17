import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import swal from 'sweetalert';

import ToastAnimated, { showToast } from '../../utils/Toast/toast';
import './users.css';
import Sidebar from '../../components/Dashboard';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit3, FiPlus, FiTrash } from 'react-icons/fi';

import placeHolder from '../../images/placeHolder.svg';

interface IUsers {
    id: string;
    name: string;
    email: string;
}

function User() {
    const history = useHistory();
    const [users, setUsers] = useState<IUsers[]>([]);
    const notify = () =>
        showToast({ type: "info", message: 'Sem users' });

    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
        })
    }, []);

    async function handledeleteSubmit() {

    }

    const delAlert = (id: string) => {
        swal({
            title: 'Deletar usuário',
            text: 'Tem certeza que quer deletar esse usuário?',
            icon: 'warning',
            buttons: ['Não', 'Sim']
        }).then(res => {
            if (res) {
                api.post(`user/delete/${id}`).then(response => {
                    history.push('/dashboard/users');
                });
                swal({ text: 'Usuário deletado com sucesso', icon: 'success', timer: 2000 })
            } else {
                history.push('/dashboard/users');
            }
        })
    }

    if (!users) {
        notify();
    }

    return (
        <div id="page-users">
            <Sidebar />
            <ToastAnimated />
            <main className="content-wrapper">
                <h1>Usuarios Cadastrados</h1>

                <div className="cards-wrapper">
                    {users?.map((user) => (
                        <div className="card-container" key={user.id}>
                            <div className="img-container">
                                <img src={placeHolder} alt="user-img" />
                            </div>
                            <div>
                                <strong>{user.name}</strong>
                                <strong>{user.email}</strong>
                                <div>
                                    <Link to={{ pathname: '/dashboard/users/edit', state: { user } }}                                    >
                                        <FiEdit3 size={20} color="#15C3D6" />
                                    </Link>
                                    <button className="button-del-user" onClick={() => delAlert(user.id)}>
                                        <FiTrash size={20} color="#ff9e9e" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                              
            </main>
            <Link to="/dashboard/user/create" className="button-register">
                    <FiPlus size={32} color="#FFF" />
            </Link> 
        </div>
    );
}

export default User;