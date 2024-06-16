import { AxiosError } from "axios";

import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseApiDelivery";
import { ProductImagesRepository } from "../../Domain/repositories/ProductImagesRepository";
import { ProductImages } from "../../Domain/entities/ProductImages";

export class ProductImagesRepositoryImpl implements ProductImagesRepository {

  async getProductImages(productId: number): Promise<ResponseAPIDelivery> {
    try {
      const product_id = String(productId);
      const { data } = await ApiDelivery.get<ResponseAPIDelivery>(`productImage/getImages/${product_id}`);
      return Promise.resolve(data);
      
    } catch (error) {
      let e = error as AxiosError;
      const apiError: ResponseAPIDelivery = JSON.parse(
      JSON.stringify(e.response?.data)
      );
      return Promise.reject(e.response?.data);
    }
  }
}