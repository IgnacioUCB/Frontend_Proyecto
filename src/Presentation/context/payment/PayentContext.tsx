import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

import { Payment } from "../../../Domain/entities/Payment";

import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseApiDelivery";
import { AuthContext } from "../auth/AuthContext";
import { getAllAddressUseCase } from "../../../Domain/useCases/Address/GetAllAddressUseCase";
import { CreateAddressUSeCase } from "../../../Domain/useCases/Address/CreateAddressUseCase";
import { CreatePaymentUSeCase } from "../../../Domain/useCases/Payment/CreatePaymentUseCase";


interface  PaymentConstextProps{
    payment: Payment[];
    createPayment(payment: Payment): Promise<ResponseAPIDelivery>;
}

export const   PaymentContext = createContext({} as PaymentConstextProps);

export const AddressProvider = ({children}: any ) => {
    
    const [payment, setPayment]= useState<Payment[]>([]);
    const {user} = useContext(AuthContext);


    const createPayment = async (payment:Payment) => {
        const response = await CreatePaymentUSeCase(payment , payment.payment_method);

        return response;
    }  
    
    return(
        <PaymentContext.Provider
            value ={{
                payment,
                createPayment,

            }}
        >
            {children}
        </PaymentContext.Provider>
    )
}