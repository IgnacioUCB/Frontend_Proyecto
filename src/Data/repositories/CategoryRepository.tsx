import { AxiosError } from "axios";

import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseApiDelivery";
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";

import { Category } from "../../Domain/entities/Category";

export class CategoryRepositoryImpl implements CategoryRepository {
    
    async getAllCategories(): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.get('category/getAll');
            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }
    async createCategory(category: Category, token: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('category', category, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async deleteCategory(id: string, token: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.delete<ResponseAPIDelivery>(`category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }
}

