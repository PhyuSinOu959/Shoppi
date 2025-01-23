import { ProductMeasurement } from './productMeasurement';

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    categoryId: string;
    isAvailable: boolean;
    measurements?: ProductMeasurement[];
    rating?: number;
    soldCount?: number;
    createdAt: string;
    updatedAt: string;
} 