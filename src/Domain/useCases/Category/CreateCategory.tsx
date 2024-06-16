import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
const { createCategory } = new CategoryRepositoryImpl();

export const createCategoryUseCase = async (category, token) => {
    return await createCategory(category, token);
}