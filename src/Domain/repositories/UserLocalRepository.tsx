import { Product } from '../entities/Product';
import { User } from '../entities/User';

export interface UserLocalRepository {
    save(user: User): Promise<void>;
    getUser(): Promise<User>;
    removeItem(): Promise<void>;
    saveProduct(products: Product[]): Promise<void>;
    getUserProducts(): Promise<Product[]>;
}