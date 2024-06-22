import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

import { Product } from "../../../Domain/entities/Product";
import { Category } from "../../../Domain/entities/Category";
import { GetUserProductsUseCase } from "../../../Domain/useCases/UserLocal/GetUserProductsUserLocal";
import { SaveProductUseCase } from "../../../Domain/useCases/UserLocal/SaveProductUserLocal";
import { GetProductImagesUseCase } from "../../../Domain/useCases/ProductImages/GetProductImages";
import { ProductImages } from "../../../Domain/entities/ProductImages";
import { GetAllCategoryUseCase } from "../../../Domain/useCases/Category/GetAllCategory";
import { GetAllProductUseCase } from "../../../Domain/useCases/Product/GetAllProduct";
import { AuthContext } from "../auth/AuthContext";
import { getShoppingCartUsecase } from "../../../Domain/useCases/shoppingCart/GetShoppingCartUSeCase";
import { saveShoppingCartUsecase } from "../../../Domain/useCases/shoppingCart/SaveShoppingCartUseCase";


interface ShoppingCartContextProps {
    categories: Category[];
    products: Product[];
    userShoppingCart: Product[];
    total: number;
    getShoppingCart: () => Promise<void>;
    saveProductShoppingCart: (product: Product) => Promise<boolean>;
    getTotal: () => void;
    removeProductShoppingCart: (product: Product) => Promise<boolean>;

}

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps);


export const ShoppingCartProvider = ({ children }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [userShoppingCart, setUserShoppingCart] = useState<Product[]>([]);
    const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false);
    const [productsLoaded, setProductsLoaded] = useState<boolean>(false);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    const {user} = useContext(AuthContext);

    const [total, setTotal] = useState<number>(0);


    useEffect ( () => {
        const fetchData = async () => {
            await getCategories();
            setCategoriesLoaded(true);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!categoriesLoaded) return;
        
        const fetchData = async () => {
            await getAllProducts();
            setProductsLoaded(true);
        }
        fetchData();
    }, [categoriesLoaded]);

    useEffect(() => {
        if (!productsLoaded) return;

        const fetchImages = async () => {
            await getImage();
            setImagesLoaded(true);
        }

        fetchImages();
    }
    , [productsLoaded]);


    // Sin el useCallback, el getTotal usa un valor antiguo de userShoppingCart.
    // El useCallback, y la dependencia [userShoppingCart], hace que cada
    // vez que el valor de userShoppingCart cambie, entonces getTotal() se
    // actualiza recién.
    const getTotal = useCallback( async () => {
        let totalPrice = 0;

        userShoppingCart.forEach((product) => {
            totalPrice += (product.price * product.quantity);
            setTotal(product.price * product.quantity);
        });
        console.log("totalPrice: ", totalPrice);
        setTotal(totalPrice);
    }, [userShoppingCart]);

 

    // Se agrega getTotal como dependencia, ya que la funcion getTotal
    // cambiará cada vez que userShoppingCart cambie
    useEffect(() => {
        getTotal();
        console.log("total use effect: ", total);
    }, [getTotal, userShoppingCart]);


    const getShoppingCart = async () => {
        
        let shoppingCart = await GetUserProductsUseCase();
        setUserShoppingCart(shoppingCart);
    }

    const saveProductShoppingCart = async (product: Product): Promise<boolean> => {
        const index = userShoppingCart.findIndex((p) => p.id === product.id);

        // Debe llamar a setuserShoppingCartShoppingCart, jamas cambiar valores
        // directamente.

        if (index === -1) {
            userShoppingCart.push(product);//se agrega por primera vez
        } else {
            userShoppingCart[index].quantity += product.quantity;
        }

        SaveProductUseCase(userShoppingCart);

        getShoppingCart();

        return Promise.resolve(true);
    }

    const removeProductShoppingCart = async (product: Product): Promise<boolean> => {
        const index = userShoppingCart.findIndex((p) => p.id === product.id);

        userShoppingCart.splice(index, 1);

        await saveShoppingCartUsecase(userShoppingCart);

        await getShoppingCartUsecase();

        return true;
    }

    const getCategories = async () => {

        let response;
        
        try {
            response = await GetAllCategoryUseCase();
        } catch (error) {
            console.log("error: ", error); 
        }
        if (response.success) {
            const categories = response.data.map((category: Category) => {
                return {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    image: category.image
                }
            });
            setCategories(categories);
        } else {
            console.log("creo que no hay categorias");
        }
    }

    const getAllProducts = async () => {
        const token = user.session_token;
        for (let category of categories) {
            const response = await GetAllProductUseCase(Number(category.id), token);
            if (response.success) {
                let products = response.data.map((product: Product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 0,
                        category_id: product.category_id
                    }
                });
    
                setProducts(prevProducts => [...prevProducts, ...products]);
            } else {
            }
        }
    }

    const getImage = async () => {
        
        const productsWithImages = await Promise.all(products.map(async (product) => {
            let response;
            try {
                response = await GetProductImagesUseCase(Number(product.id));
            } catch (error) {
                console.log("error: ", error);
                //continue with the following product in the products array
                return product;
            }   
            if (response.success) {
                const images = response.data.map((productImage: ProductImages) => {
                    return {
                        id: productImage.id,
                        product_id: productImage.product_id,
                        image: productImage.image
                    }
                });
                const imagesUris = images.map((image) => {
                    return image.image;
                });
                return { ...product, image: imagesUris };
            } else {
                return product;
            }
        }));
        setProducts(productsWithImages);
    }


    //el error de abajo no afecta en nada la funcionalidad de la app (ni uno ni lo otro 2.0)
    return (
        <ShoppingCartContext.Provider
            value={{
                categories,
                products,
                userShoppingCart,
                total,
                getShoppingCart,
                saveProductShoppingCart,
                removeProductShoppingCart,
                getTotal
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}

    