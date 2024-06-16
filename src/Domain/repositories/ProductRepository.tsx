import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseApiDelivery";
import { Product } from "../entities/Product";

export interface ProductRepository {
  //createProduct(name: string, price: number,id?: string, image?: string,cateory_id?: number ): Promise<ResponseAPIDelivery>

  createProduct(product: Product): Promise<ResponseAPIDelivery>;
  getAllProduct(categoryId: number, token: string): Promise<ResponseAPIDelivery>;
  //llenar parametros
}
