import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
const { getAllProduct } = new ProductRepositoryImpl();

export const GetAllProductUseCase = async (categoryId: number, token: string) => {
  return await getAllProduct(categoryId, token);
};
