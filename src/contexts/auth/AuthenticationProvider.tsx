
import { useEffect, useState } from 'react';
import type { Area, AuthenticationProviderProps, Credentials, User } from '../../types';
import { AuthenticationContext } from './AuthenticationContext';

const AuthenticationProvider = ({children}: AuthenticationProviderProps) => {
    const [user , setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    
    
    useEffect(() => {
    setToken(localStorage.getItem('token'))
    }, [])
    
    useEffect(() =>{
        
        console.log('nt2', token)
        
        if(!token) return
        
        const refreshLogger = async () => {
            try{
                
                const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`,{
                    
                    method:'GET',
                    headers: { Authorization: `Bearer ${token}`},
                    
                })
                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message || 'Invalid or Expired Log in')
                }
                const user = await res.json()
            setUser(user)
        } catch {
            localStorage.removeItem('token')
            setUser(null)
        }
    }
    refreshLogger()
    },[token])

    const login = async (userData:Credentials) => {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`,{

            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message || 'Login failed')
        }

        const {user , token}  = await res.json()
        setUser(user)
        setToken(token)
        localStorage.setItem('token' , token)
    }
    
    const register = async (userData:Credentials) => {
        console.log('nicts' , userData)
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/users/registration`,{
            
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
        if (!res.ok) {
            const error = await res.json()
            console.error(error.message)
            throw new Error(error.message || 'Registration failed')
        }
        const {cred , token} = await res.json()
        console.log('lb' , cred ,token)
        setUser(cred)
        setToken(token)  
        localStorage.setItem('token' , token)
    }
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }
    const addUserArea = async (area: Area) => {
        
        console.log('ntlb' , area, user , token)
        if(!user || !token) return
        try {
            
            const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me/areas`,{
                method:'PATCH',
                headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                body: JSON.stringify({ area }),
            })
            
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.message)
            }
            const updatedUser = await res.json()
            setUser(updatedUser)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    useEffect(() => {
        
        if (!token) {
            setUser(null)
            return
        }

        const hydrateUser = async () => {
            try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Invalid token");

            const user = await res.json();
            setUser(user);
            } catch {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null)
            }
        };

        hydrateUser();
    }, [token]);

    return (
        <AuthenticationContext.Provider value={{user, token, login, register, logout , addUserArea}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationProvider;
