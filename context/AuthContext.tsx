import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    isAdmin: boolean;
    // ... other user properties
}

interface AuthContextType {
    user: User | null;
    // ... other auth methods
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Add your authentication logic here
    
    return (
        <AuthContext.Provider value={{ user }}>
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