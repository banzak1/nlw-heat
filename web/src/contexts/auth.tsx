import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}


type AuthContextData = {
    user: User | null;
    signInUrl: string;
}

type AuthResponse = {
    token: string,
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}


export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
    children: ReactNode;
}


export function AuthProvider(props: AuthProvider) {

    const [user, setUser] = useState<User | null>(null);

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=a4e3286b26e8fe6ea5e1`;

    async function signIn(githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        })

        const { token, user } = response.data;

        localStorage.setItem('@dowhile:token', token);

        setUser(user);
    }


    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');

            console.log({ urlWithoutCode, githubCode });

            window.history.pushState({}, '', urlWithoutCode);

            signIn(githubCode);
        }
    }, [])



    return (
        <AuthContext.Provider value={{ signInUrl, user }}>
            {props.children}
        </AuthContext.Provider>
    );
}

