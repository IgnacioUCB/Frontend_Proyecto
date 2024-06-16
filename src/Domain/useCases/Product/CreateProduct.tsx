import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
const { createProduct } = new ProductRepositoryImpl();

export const CreateProductUseCase = async (product) => {
    return await createProduct(product);
}