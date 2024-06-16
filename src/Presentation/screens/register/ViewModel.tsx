import { useContext, useState } from "react"
import { RegisterAuthUseCase } from "../../../Domain/useCases/Auth/RegisterAuth"
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseApiDelivery";
import { SaveUserUseCase } from "../../../Domain/useCases/UserLocal/SaveUserLocal";
import { AuthContext } from "../../context/auth/AuthContext";
import { User } from "../../../Domain/entities/User";
import { Address } from "../../../Domain/entities/Address";
import { UpdateFileUseCase } from "../../../Domain/useCases/File/UpdateFile";

interface Values{
    name: string,
    last_name: string,
    email: string,
    password: string,
    image: string,
    confirmPassword: string,
    phone: string,

}

interface ResponseErrorData{
    path: string,
    value: string 
}

const validationRegisterSchema = yup.object().shape({
    image: yup.string().required('La imagen es requerida'),
    name: yup.string().required('El nombre es requerido'),
    last_name: yup.string().required('El apellido es requerido'),
    email: yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es requerido'),
    phone: yup.string().required('El teléfono es requerido'),
    password: yup.string().required('La contraseña es requerida'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es requerida')

})

const RegisterViewModel = () => {

    const {auth} =useContext(AuthContext);

    const [file, setFile] = useState<ImagePicker.ImageInfo>();

    const [values, setValues] = useState<Values>({
        name: '',
        last_name: '',
        email: '',
        phone: '', 
        image: '',
        password: '',
        confirmPassword: '',
    

    })
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);

    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);

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
        
        }
    }

    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value });
        
    }

    const register = async () =>{
        const isValid = await isValidForm();
        if(isValid){
            setLoading(true);
            try{
                const { image, confirmPassword, ...data } = values;
                
                const response = await RegisterAuthUseCase(values);
                if(response.success){
                    const responseImage = await UpdateFileUseCase(file!, 'user', response.data.id);
                    
                    const dataUser = response.data;
                    dataUser.image = responseImage.data;

                    await SaveUserUseCase(dataUser);
                    auth(dataUser);
                
                }
                setLoading(false);
            }catch(error){
              
                const rejectErrors: ResponseAPIDelivery = error;
                if(rejectErrors.errors){
                    setErrorResponses([]);
                    showMessage({
                    message: rejectErrors.message,
                    type: 'danger',
                    icon: 'danger',
                    })
                }else{
                    // Convert JSON to Array
                    const errorsArray = Object.values(rejectErrors.errors);

                    // Filter array with msg and path
                    const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
                  
                    setErrorResponses(errorsArrayFilter);

                }
                setLoading(false);
                
            }
        }

    }

    const isValidForm = async(): Promise<boolean> =>{
        try{
            await validationRegisterSchema.validate(values, {abortEarly: false});
            return true;
        }catch (error){
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path]= err.message;
            });
            setErrorMessages(errors);

            return false;
        }
    }
return {
    ...values,
    pickImage,
    takePhoto,
    onChange,
    register,
    errorMessages,
    errorsResponse,
    loading
}

}

export default RegisterViewModel