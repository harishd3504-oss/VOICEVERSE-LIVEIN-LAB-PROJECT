import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
    id: number;
    email: string;
    full_name?: string;
    preferred_language: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/users/me');
                    setUser(response.data);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('token', token);
        try {
            const response = await api.get('/users/me');
            setUser(response.data);
            // Determine where to redirect based on user state or flow
            navigate('/preference');
        } catch (error) {
            console.error("Login fetch user failed", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
