import { AddressRepositoryImpl } from "../../../Data/repositories/AddressRepository" 


const { getAllAddress} = new AddressRepositoryImpl();


export const getAllAddressUseCase = async (token: string) => {
    return await getAllAddress(token);
}