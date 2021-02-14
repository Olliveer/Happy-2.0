import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth';

//VERIFICAR O USER QUE VEM DO BACKEND


// interface User {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     // admin: boolean;
// }

// interface Credentials {
//     email: string;
//     password: string;
// }

interface AuthContextData {
    signed: boolean;
    // user: User | null;
    token: string | null;
    loading: boolean;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    // const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        // const storageUser = localStorage.getItem('@RNAuth:user');
        const storageToken = localStorage.getItem('web:token');

        if (storageToken) {
            // api.defaults.headers.Authorization = `Bearer ${storageToken}`;
            setToken(storageToken);
            setLoading(false);
        }

    }, []);

    async function signIn(username: string, password:string) {
        const response = await auth.SignInService(username, password);
    
        console.log('Response data ' + response.data.token);
        setToken(response.data.token);
    
        localStorage.setItem('web:token', response.data.token);
      }

    function signOut() {
        setToken(null);
        localStorage.removeItem('web:token');
    }


    return (
        <AuthContext.Provider value={{ signed: Boolean(token), token, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
