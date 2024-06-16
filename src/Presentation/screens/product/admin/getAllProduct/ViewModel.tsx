import { useContext, useState } from "react";
import { GetAllProductUseCase } from "../../../../../Domain/useCases/Product/GetAllProduct";
import * as yup from "yup";
//import { showMessage } from "react-native-flash-message";
import {
  Error,
  ResponseAPIDelivery,
} from "../../../../../Data/sources/remote/api/models/ResponseApiDelivery";
//import { AuthContext } from "../../../context/auth/AuthContext";
import { Product } from "../../../../../Domain/entities/Product";
import { AuthContext } from "../../../../context/auth/AuthContext";


interface Values {
  error: string;
  products?: Product[];
  loading: boolean;
}

const GetAllProductViewModel = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>();
  const { user } = useContext(AuthContext);

  const showProduct = async (categoryId: number) => {
    setProducts([]);
    setError("");
    getProducts(categoryId);
  };

  const getProducts = async (categoryId: number) => {
    try {
      const token = user.session_token;
      console.log("se entra al try");
      console.log(categoryId);
      const response = await GetAllProductUseCase(categoryId, token);
      //enters try
      console.log("se termina el await");
      console.log(response);
      if (response.success) {
        //get the products
        //success
        const products = response.data.map((product: Product) => {
          console.log("se entra al map");
          return {
            id: product.id,
            is_active: product.is_active,
            name: product.name,
            price: product.price,
            image: product.image,
          };
        });
        setProducts(products);
        setLoading(false);
      }
      console.log("no es ni uno ni lo otro");
    } catch (error) {
      console.log("se entra a error");
      if (error === undefined) {
        setError("Error de conexión");
        console.log("error de conexión");
      } else {
        const rejectErrors: ResponseAPIDelivery = error;
        const errorsArray = Object.values(rejectErrors.errors);
        const errorArray = Object.values(errorsArray[0]);
        setError(errorArray[0]);
      }
      setLoading(false);
    }
  };

  return {
    showProduct,
    products,
    error,
    loading,
    setLoading
  };
};

export default GetAllProductViewModel;
