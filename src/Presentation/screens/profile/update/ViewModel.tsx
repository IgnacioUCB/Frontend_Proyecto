import { useContext, useState } from "react";

import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';

import {User} from "../../../../Domain/entities/User";

import { AuthContext } from "../../../context/auth/AuthContext";
import { RemoveUserUseCase } from "../../../../Domain/useCases/UserLocal/RemoveUserLocal";
import { UserUpdateUseCase } from "../../../../Domain/useCases/User/UserUpdateUserCase";
import { UpdateFileUseCase } from "../../../../Domain/useCases/File/UpdateFile";
import { showMessage } from "react-native-flash-message";

interface Values{
    name: string,
    last_name: string,
    phone: string,
    image: string
}

const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    last_name: yup.string().required('El apellido es requerido'),
    phone: yup.string().required('El teléfono es requerido').matches(/^\d{9}$/, 'El teléfono debe tener 9 dígitos exactamente'),
    
})

const ProfileUpdateViewModel = () => {
    const { user, updateUser } = useContext(AuthContext);

    const [values, setValues] = useState<Values>({
        name: '',
        last_name: '',
        phone: '',
        image: ''
    })

    const [file, setFile] = useState<ImagePicker.ImageInfo>();

    const [successMessage, setSuccessMessage] = useState('');

    const [errorMessages, setErrorMessages] = useState<Record<string,string>>({})

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

    const onChangeInfoUpdate = async (name: string, last_name: string, phone: string) => {
        setValues({ ...values, name: name, last_name: last_name, phone: phone });
    }
    

    const isValidForm = async(): Promise<boolean> =>{
        try{
            await validationSchema.validate(values, {abortEarly: false});
            return true;
        }catch (error){
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path]= err.message;
            });
            setErrorMessages(errors);
            console.log(errors)

            return false;
        }
    }

    const updateUserInfo = async () => {
        const validForm = await isValidForm();
        
        if(validForm){
            try {
                setErrorMessages({});
                setLoading(true);
                
                const{image, ...data} = values;

                const response = await UserUpdateUseCase(user.id, data.name, data.last_name, data.phone, user.session_token);

                if(response.success){
                    const dataUser = await response.data;

                    dataUser.session_token = user.session_token;

                    if(file !== undefined){
                        const responseImage = await UpdateFileUseCase(file!, 'user', response.data.id);    
                        dataUser.image_url = responseImage.data;
                    }

                    setLoading(false);
                    updateUser(dataUser);
                    return true;
                }
                
            } catch (error) {
                console.log(error);
                setLoading(false);
                return false;
            }
        }
    }
    

    return {
        ...values,
        onChange,
        onChangeInfoUpdate,
        updateUserInfo,
        pickImage,
        takePhoto,
        errorMessages,
        successMessage,
        loading,
        file,
        user

    }
    
};

export default ProfileUpdateViewModel;