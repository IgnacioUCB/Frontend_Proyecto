import { useState } from 'react';
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { ResponseAPIDelivery } from '../../../Data/sources/remote/api/models/ResponseApiDelivery';
import { ChangePasswordUseCase } from '../../../Domain/useCases/Auth/ChangePasswordUseCase';

interface ResponseErrorData {
    path: string,
    value: string
}

interface Values {
    email: string,
    newPassword: string,
    confirmPassword: string
}

const validationRegisterSchema = yup.object().shape({
    email: yup.string().email('Email no válido').required('El email es requerido'),
    newPassword: yup.string().required('La nueva contraseña es requerida'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es requerida')
});

export const useChangePasswordViewModel = () => {

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);
    const [values, setValues] = useState<Values>({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value });
    }

    const isValid = async () => {
        try {
            await validationRegisterSchema.validate(values, { abortEarly: false });
            setErrorMessages({});
            return true;
        } catch (error) {
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            setErrorMessages(errors);
            console.log(errorMessages);
            return false;
        }
    }

    const changePassword = async () => {
        try {
            const validate = await isValid()
            if (validate) {
                const change = await ChangePasswordUseCase(values.email, values.newPassword, values.confirmPassword);
                if (!change.error) {
                    showMessage({
                        message: change.message,
                        type: 'success',
                        icon: 'success',
                    });
                    return true;
                }
            }
        } catch (error) {
            const rejectErrors: ResponseAPIDelivery = error;
            if (rejectErrors.error) {
                setErrorResponses([]);
                showMessage({
                    message: rejectErrors.message,
                    type: 'danger',
                    icon: 'danger',
                });
                return false;
            } else {
                const errorsArray = Object.values(rejectErrors.errors);
                const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }));
                setErrorResponses(errorsArrayFilter);
                return false;
            }
        }
    }

    return {
        ...values,
        onChange,
        errorMessages,
        errorsResponse,
        isValid,
        changePassword
    }

}