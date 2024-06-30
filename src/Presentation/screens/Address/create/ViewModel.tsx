import { useContext, useState } from "react"

import * as yup from 'yup';
import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../../Data/sources/remote/api/models/ResponseApiDelivery";

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../../context/auth/AuthContext";
import { AddressConstext } from "../../../context/address/AddressContext";


interface Values{
    nickname:string,
    address: string,
    lat:number,
    long: number,
    user_id: string,
    loading: boolean
}

interface ResponseErrorData {
    path: string;
    value: string;
}

const validationCreateAddressSchema = yup.object().shape({
    nickname: yup.string().required('El apodo es obligatorio'),
    address: yup.string().required('La direccion es obligatoria').max(50, 'La direccion no puede tener más de 50 caracteres'),
    lat: yup.string().required('El latitud es obligatoria'),
    long: yup.string().required('El longitud es obligatoria')
});


const AddressCreateViewModel = () => {

    const {createAddress} = useContext(AddressConstext);

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    
    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);
    
    
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();
    
    const { user } = useContext(AuthContext);

    const create = async () => {
        const validForm = isValidForm();

        if(validForm){
            try { 
                const {...data } = values;
                setLoading(true);
                //call the addressContext to create address
                const response = await createAddress(data);
                if (response.success){
                    setLoading(false); 
                    showMessage({
                        message:'Direccion Registrada',
                        description:'La direccion ha sido registrada correctamente',
                        type: 'success',
                    })
                    console.log('Aqui llego');
                    //TODO: clear form

                }
            } catch (error) {
                setLoading(false);
            }
        }
        setLoading(false);
    } 
    
    const [values, setValues] = useState({
        nickname: '',
        address: '',
        lat: 0,
        long: 0,
        user_id: user.id,
        loading: false,
    })

    const onChange = async(property: keyof Values , value: string) =>{
        setValues({...values, [property]: value});
        setErrorMessages((prevErrors) => ({...prevErrors, [property]:''}));
    }

    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationCreateAddressSchema.validate(values, { abortEarly: false });
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

    return {
        ...values,
        onChange,
        errorMessages,
        setErrorMessages,
        errorsResponse,
        create,
        loading,
        setLoading
    }
}


export default AddressCreateViewModel