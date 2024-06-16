import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { Product } from "../../entities/Product";

const { saveProduct } = new UserLocalRepositoryImpl();

export const SaveProductUseCase = async (products: Product[]) => {
    return await saveProduct(products);
}