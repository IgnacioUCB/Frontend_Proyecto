import { AddressRepositoryImpl } from "../../../Data/repositories/AddressRepository";
import { Address } from "../../entities/Address";

const {createAddres} = new AddressRepositoryImpl()

export const CreateAddressUSeCase = async (address:Address, token:string) => {

    return await createAddres(address,token);
}