export interface Product {
    id?: string;
    name: string;
    image?: string[];
    price: number;
    category_id?: number;
    is_active?: boolean;
    quantity?: number;
}