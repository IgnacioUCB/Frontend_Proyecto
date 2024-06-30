import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

import { Address } from "../../../Domain/entities/Address";

import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseApiDelivery";
import { AuthContext } from "../auth/AuthContext";
import { getAllAddressUseCase } from "../../../Domain/useCases/Address/GetAllAddressUseCase";
import { CreateAddressUSeCase } from "../../../Domain/useCases/Address/CreateAddressUseCase";


interface  AddressConstextProps{
    address: Address[];
    getAllAddress(): Promise<void>;
    createAddress(address: Address): Promise<ResponseAPIDelivery>;
}

export const   AddressConstext = createContext({} as AddressConstextProps);

export const AddressProvider = ({children}: any ) => {
    
    const [address, setAddress]= useState<Address[]>([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (address.length === 0 ) getAllAddress();
    }, [])


    const getAllAddress = async () => {
        try {
           const response = await getAllAddressUseCase(user.id,user.session_token);
           setAddress(response.data as Address[]);
        } catch (error) {
            setAddress([]);
        }

    }  

    const createAddress = async (address:Address) => {
        const response = await CreateAddressUSeCase(address , user.session_token);
        
        getAllAddress();
        return response;
    }  
    
    return(
        <AddressConstext.Provider
            value ={{
                address,
                getAllAddress,
                createAddress,

            }}
        >
            {children}
        </AddressConstext.Provider>
    )
}