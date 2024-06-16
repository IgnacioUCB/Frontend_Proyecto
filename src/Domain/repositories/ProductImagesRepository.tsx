import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseApiDelivery";
import { ProductImages } from "../entities/ProductImages";

export interface ProductImagesRepository {
  getProductImages(productId: number): Promise<ResponseAPIDelivery>;
  //llenar parametros
}