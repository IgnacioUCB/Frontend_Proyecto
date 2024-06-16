import { Product } from "../../../../../Domain/entities/Product";
import { useContext, useState } from "react"
import { ShoppingCartContext } from "../../../../context/shoppingCart/ShoppingCartContext";
import { Alert } from "react-native";


const ShowProductScreenViewModel = () => {

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [catProducts, setCatProducts] = useState<Product[]>([]);

    const {products, saveProductShoppingCart, userShoppingCart} = useContext(ShoppingCartContext);


    const showProduct = async (categoryId: number) => {
        setError("");
        const filteredProducts = getProducts(categoryId);  
        setCatProducts(filteredProducts);
        setLoading(false);
    };


    const getProducts = (categoryId: number) => {
        try {
            console.log("Productos: ",products);
            const prods = products.filter(product => product.category_id === categoryId);
            console.log("Productos filtrados: ",prods);
            return prods;
        } catch (error) {
            console.error('Error filtering products:', error);
        }
    }

    const addProductToCartVM = async (product: Product): Promise<void> => {
        // Esto es porque si modificamos product.quantity ya estamos haciendo la logica de actualizar cantidad
        // y en la funcion saveProductShoppingCart del context, se suma la cantidad de si mismo.
        // Porque product es el product original, y por referencia es lo mismo que products[index].
        // Entonces esta diciendo literal product.quantity = product.quantity + product.quantity

        Alert.alert(
            "Producto añadido ", // Alert title
            "El producto se ha añadido de forma exitosa.", // Message ALERTA
            [
              {
                text: "ACEPTAR.", // Button text
                onPress: () => console.log("OK Pressed"), // confirma la alerta
                //navigation.navigate('ShoppingCartListScreen') // navega a la pantalla de carrito OJITO AQUI
              },
            ]
          );
        console.log("se añade: ",product.name);
        await saveProductShoppingCart({...product});
    }

    return {
        showProduct,
        catProducts,
        addProductToCartVM,
        error,
        loading,
        setLoading
    }

}

export default ShowProductScreenViewModel;