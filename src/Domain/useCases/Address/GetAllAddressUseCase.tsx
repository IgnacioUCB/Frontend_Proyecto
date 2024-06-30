import { AddressRepositoryImpl } from "../../../Data/repositories/AddressRepository" 


const { getAllAddress} = new AddressRepositoryImpl();


export const getAllAddressUseCase = async (user_id:string,token: string) => {
    return await getAllAddress(user_id,token);
}