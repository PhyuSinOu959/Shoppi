import { Product } from './product';

export interface Category {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    products?: Product[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
} 