import { ProductImagesRepositoryImpl } from "../../../Data/repositories/ProductImagesRepository";
const { getProductImages } = new ProductImagesRepositoryImpl();

export const GetProductImagesUseCase = async (productId: number) => {
  return await getProductImages(productId);
};