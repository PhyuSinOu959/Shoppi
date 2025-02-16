export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    avatarUrl?: string;
    address?: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile extends User {
    isEmailVerified?: boolean;
    preferences?: {
        notifications: boolean;
        newsletter: boolean;
        darkMode: boolean;
    };
} 