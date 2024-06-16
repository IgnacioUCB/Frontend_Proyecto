import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { Product } from "../../entities/Product";

const { getUserProducts } = new UserLocalRepositoryImpl();

export const GetUserProductsUseCase = async () => {
    return await getUserProducts();
}