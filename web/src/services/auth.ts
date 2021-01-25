import { AxiosResponse } from 'axios';
import api from './api';


interface AuthResponse {
    token: string;
  }

interface User {
    email: string;
    password: string;
}

// export function signIn(user: User): Promise<AuthResponse> {
//     return api.post('login', user).then((res) => res.data).catch((err) => err.response.data);
// }

export async function SignInService(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await api.post('login', {email, password});
  }

export function signOut(): void {
    localStorage.clear();
}

// export function signIn(): Promise<Response> {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 token: '213kl23nklj1n3kj12n3kj1n23kj1n23kn1k2j32nkj',
//                 user: {
//                     name: 'Eu mesmo',
//                     email: 'eu@email.com',
//                 },
//             });
//         }, 2000);
//     });
// };