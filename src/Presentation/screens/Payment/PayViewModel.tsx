import React, {useRef, useState, useEffect, useCallback, useContext} from "react";
import * as yup from 'yup';

import stripe from 'react-native-stripe-client'
import { showMessage } from "react-native-flash-message";
import { Error, ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseApiDelivery";

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/auth/AuthContext";
import { PaymentContext } from "../../context/payment/PayentContext";
import { ShoppingCartContext } from "../../context/shoppingCart/ShoppingCartContext";
import { CreatePaymentUSeCase } from "../../../Domain/useCases/Payment/CreatePaymentUseCase";


interface Values {
    holder: string;
    number: string;
    exp_moth: number;
    exp_year: number;
    cvv: string;
}

interface valuesPayment {
    amount: string,
    currency: string,
    description: string,
    payment_method: string,
    loading: boolean
}

interface ResponseErrorData{
    path: string,
    value: string 
}


const validationCreatePaymentSchema = yup.object().shape({
    holder: yup.string().required('El nombre es obligatorio'),
    number: yup.string().required('La numero es obligatoria').max(50, 'La direccion no puede tener más de 50 caracteres'),
    exp_moth: yup.string().required('El mes de vencimiento es obligatorio'),
    exp_year: yup.string().required('El año de vencimiento es obligatorio'),
    cvv: yup.string().required('El cvv de vencimiento es obligatorio'),
});


const PayViewModel = () => {

    const [valuesCard, setValuesCard] = useState<Values>({
        holder: '',
        number: '',
        exp_moth: 0,
        exp_year: 0,
        cvv: '',
    })

    const [ValuesPayment, setValuesPayment] = useState<valuesPayment>({
        amount: '',
        currency: '',
        description: '',
        payment_method: '',
        loading: false,
    })

    const onChange = (property: string, value: string) => {
        setValuesPayment({ ...ValuesPayment, [property]: value });
    }

    const navigation = useNavigation();
    
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const {createPayment} = useContext(PaymentContext);

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);
    
    useEffect(() => {
        if(valuesCard.number && valuesCard.exp_moth && valuesCard.exp_year && valuesCard.cvv && valuesCard.holder){
            createOrder();
        }
    }, [valuesCard]);

    const creditCardRef = useRef() as any;

    const handleSubmit = useCallback(() => {
        if (creditCardRef.current) {
        const { error, data } = creditCardRef.current.submit();
        
        //TODO: Display error with view
        console.log('ERROR: ', error);

            if(!error){
                const formatedData ={
                    holder: data.holder,
                    number: data.number.replace(/\s/g, ''), 
                    exp_moth: data.expiration.split('/')[0],
                    exp_year: data.expiration.split('/')[1],
                    cvv: data.cvv,
                }
        
                setValuesCard(formatedData);   
                showMessage({
                    message:'Verficando Tarjeta',
                    description:'se esta verificando el pago',
                    type: 'warning',
                })            
            }

        }
    }, []);    

    const isValidForm = async(): Promise<boolean> =>{
        try{
            await validationCreatePaymentSchema.validate(ValuesPayment, {abortEarly: false});
            return true;
        }catch (error){
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path]= err.message;
            });
            setErrorMessages(errors);
            console.log(errorMessages);
            return false;
        }
    }
    
    const stripeClient = stripe("pk_test_51PVKX0P76zSvaTYvXLeiVIcIr1sYJCjqNsq2sGIxvr1BhIWbjEwmYWScm4gsfD6XQjpPVd93yqkbGpTkGabvn0os00gpj2A518");
    //console.log('stripeClient: ', stripeClient);
    
    const createOrder = async () => {
        const validForm = isValidForm();
        
        const {id} = await stripeClient.createPaymentMethod("card", {
            number: valuesCard.number,
            exp_month: valuesCard.exp_moth,
            exp_year: valuesCard.exp_year,
            cvc: valuesCard.cvv
          });

        console.log(id);


        //TODO: Send payment to backend
    }

    const create = async () => {
        const validForm = isValidForm();

        if(validForm){
            try { 
                
            const {id} = await stripeClient.createPaymentMethod("card", {
                number: valuesCard.number,
                exp_month: valuesCard.exp_moth,
                exp_year: valuesCard.exp_year,
                cvc: valuesCard.cvv
            });
            const {payment_method ,...data } = ValuesPayment;
            setLoading(true);
            //call the addressContext to create address
            onChange(payment_method, id);
            console.log('id',  id);
            console.log('pay_method',  payment_method);
            const response = await createPayment(data);
            if (response.success){
                setLoading(false); 
                showMessage({
                    message:'Direccion Registrada',
                    description:'El pago ha sidor registrada correctamente',
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
    
    return {
        createOrder,
        creditCardRef,
        handleSubmit,
        create,
    }
}

export default PayViewModel;