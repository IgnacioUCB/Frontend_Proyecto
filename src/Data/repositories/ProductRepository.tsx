import { AxiosError } from "axios";

import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseApiDelivery";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { Product } from "../../Domain/entities/Product";

export class ProductRepositoryImpl implements ProductRepository {
  async getAllProduct(categoryId: number, token: string): Promise<ResponseAPIDelivery> {
    try {
      const category_id = String(categoryId);
      const { data } = await ApiDelivery.get<ResponseAPIDelivery>(`product/getAll/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
      }
      });
      return Promise.resolve(data);
    } catch (error) {
      let e = error as AxiosError;
      const apiError: ResponseAPIDelivery = JSON.parse(
      JSON.stringify(e.response?.data)
      );
      return Promise.reject(e.response?.data);
    }
  }

  async createProduct(product: Product): Promise<ResponseAPIDelivery & {product_id: number}> {
    try {
      const { data } = await ApiDelivery.post<ResponseAPIDelivery & {product_id: number}>(
        "product/postProduct",
        product
      );
      return data;
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: ", JSON.stringify(e.response?.data));
      return Promise.reject(e.response?.data);
    }
  }
}
