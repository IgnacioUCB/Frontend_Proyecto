import { useContext, useState } from "react"
//import { CreateCategoryUseCase} from "../../../../Domain/useCases/Category/CreateCategory";
import { GetAllCategoryUseCase} from "../../../../../Domain/useCases/Category/GetAllCategory";
import { DeleteCategoryUseCase } from "../../../../../Domain/useCases/Category/DeleteCategory";
import * as yup from 'yup';
//import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../../../Data/sources/remote/api/models/ResponseApiDelivery";
//import { AuthContext } from "../../../context/auth/AuthContext";
import { Category } from "../../../../../Domain/entities/Category";
import { AuthContext } from "../../../../../Presentation/context/auth/AuthContext";
import { authReducer } from "../../../../context/AuthReducer";


interface Values {
    error: string;
    categories?: Category[];
    loading: boolean;
}

const CategoryViewModel = () => {


    const [error, setError] = useState<string>('');

    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<Category[]>();

    const { user } = useContext(AuthContext);


    const showCategory = async () => {
        setCategories([]);  
        setError('');
        getCategories();
    }

    const getCategories = async () => {
        try {
            const response = await GetAllCategoryUseCase();
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
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log("error en getCategories");
            console.log(error);
            if(error === undefined){
                setError('Error de conexión');
            } else {

                const rejectErrors: ResponseAPIDelivery = error;
                const errorsArray = Object.values(rejectErrors.errors);
                const errorArray = Object.values(errorsArray[0]);
                setError(errorArray[0]);
                console.log(errorArray[0]);
            }
        }
    }

    const deleteCategory = async (id: string) => {
        try {
            const token = user.session_token;
            console.log(token);
            const response = await DeleteCategoryUseCase(id, token);
            if (response.success) {
                console.log("sale bien lol");
                setLoading(true);
                showCategory();
            } else {
                console.log("sale mal lol");
            }
        } catch (error) {
            setLoading(false);
            console.log("error en getCategories");
            console.log(error);
            if(error === undefined){
                setError('Error de conexión');
            } else {

                const rejectErrors: ResponseAPIDelivery = error;
                const errorsArray = Object.values(rejectErrors.errors);
                const errorArray = Object.values(errorsArray[0]);
                setError(errorArray[0]);
                console.log(errorArray[0]);
            }
        }
    }

    return {
        showCategory,
        categories,
        error,
        loading,
        setLoading,
        deleteCategory
    }

}

export default CategoryViewModel;