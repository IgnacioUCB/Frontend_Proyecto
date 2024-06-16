import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
const { getAllCategories } = new CategoryRepositoryImpl();

export const GetAllCategoryUseCase = async () => {
    return await getAllCategories();
}