import { useContext, useState } from "react"
//import { CreateCategoryUseCase} from "../../../../Domain/useCases/Category/CreateCategory";
import { GetAllCategoryUseCase} from "../../../../../Domain/useCases/Category/GetAllCategory";
import * as yup from 'yup';
//import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../../../Data/sources/remote/api/models/ResponseApiDelivery";
//import { AuthContext } from "../../../context/auth/AuthContext";
import { ShoppingCartContext } from "../../../../context/shoppingCart/ShoppingCartContext";
import { Category } from "../../../../../Domain/entities/Category";

interface Values {
    error: string;
    categories?: Category[];
    loading: boolean;
}

const showCategoryViewModel = () => {

    const [error, setError] = useState<string>('');

    const [loading, setLoading] = useState(true);

    const {categories, products} = useContext(ShoppingCartContext);

    const showCategory = async () => {  
        setError('');
        setLoading(false);
    }


    return {
        showCategory,
        categories,
        error,
        loading,
        setLoading
    }

    
}

export default showCategoryViewModel