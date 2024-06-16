import { useContext, useState } from "react"
import { createCategoryUseCase} from "../../../../../Domain/useCases/Category/CreateCategory";
import { UpdateFileUseCase } from "../../../../../Domain/useCases/File/UpdateFile";
import * as yup from 'yup';
import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../../../Data/sources/remote/api/models/ResponseApiDelivery";
import { Category } from "../../../../../Domain/entities/Category";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../../../context/auth/AuthContext";

interface Values {
    name: string;
    description: string;
    image: string;
    loading: boolean;
}

interface ResponseErrorData {
    path: string;
    value: string;
}



const validationCategorySchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    image: yup.string().required('La imagen es obligatoria'),
    description: yup.string().required('La descripción es obligatoria').max(150, 'La descripción no puede tener más de 150 caracteres'),
});

const CreateCategoryViewModel = () => {

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);

    const [file, setFile] = useState<ImagePicker.ImageInfo>();

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const { user } = useContext(AuthContext);


    const [values, setValues] = useState<Values>({
        name: '',
        description: '',
        image: '',
        loading: false,
    });

    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value });
    }



    const createCategory = async () => {
        setErrorMessages({});
        setValues({ ...values, loading: true });
        const isValid = await isValidForm();
        if (isValid) {
            setErrorMessages({});
            try {
                console.log(user.session_token);
                const response = await createCategoryUseCase(values as Category, user.session_token);
                if (response.success) {
                    const responseImage = await UpdateFileUseCase(file!, 'category', response.data.id);
                    if (responseImage.success) {
                        showMessage({
                            message: 'Categoria creada correctamente',
                            type: 'success',
                            icon: 'success',
                        });
                        setValues({...values, name: '', description: '', image: '', loading: false});
                        navigation.goBack();
                        
                    }

                }
            } catch (error) {
                setValues({ ...values, loading: false });
                const rejectErrors: ResponseAPIDelivery = error;
                console.log("error en createCategory");
                console.log(error);
                console.log(rejectErrors);

                if(error === undefined){
                    setValues({ ...values, loading: false });
                    showMessage({
                        message: 'Error en la conexión',
                        type: 'danger',
                        icon: 'danger',
                    });
                }

                if (rejectErrors.error) {
                    setErrorResponses([]);
                    showMessage({
                        message: rejectErrors.message,
                        type: 'danger',
                        icon: 'danger',
                    });
                    setValues({ ...values, loading: false });
                } else {

                    // Convert JSON to Array
                    const errorsArray = Object.values(rejectErrors.errors);

                    // Filter array with msg and path
                    const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
                    setErrorResponses(errorsArrayFilter);
                    console.log(errorsArrayFilter);
                    setValues({ ...values, loading: false });

                }
                setValues({ ...values, loading: false });
            }
        }
    }


    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationCategorySchema.validate(values, { abortEarly: false });
            return true;
        } catch (error) {
            console.log("error en validForm")
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                console.log(err.path, err.message)
                errors[err.path] = err.message;
            });
            setErrorMessages(errors);
            setValues({ ...values, loading: false });
            return false;
        }
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            });
    
            if (!result.canceled) {
                onChange('image', result.assets[0].uri);
                setFile(result.assets[0]);
    
            }
        } catch (error) {
            console.log(error);
        }
    }

    const takePhoto = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            });

            if (!result.canceled) {
                onChange('image', result.assets[0].uri);
                setFile(result.assets[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        ...values,
        onChange,
        createCategory,
        errorMessages,
        errorsResponse,
        pickImage,
        takePhoto,
    }

}

export default CreateCategoryViewModel;