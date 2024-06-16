import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseApiDelivery";
import { Category } from "../entities/Category";


export interface CategoryRepository{
    getAllCategories(): Promise<ResponseAPIDelivery>
    createCategory(category: Category, token: string): Promise<ResponseAPIDelivery>
    deleteCategory(id: string, token: string): Promise<ResponseAPIDelivery>
}