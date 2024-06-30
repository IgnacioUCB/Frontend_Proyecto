import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseApiDelivery";
import { Address } from "../entities/Address";

export interface AddressRepository {
    getAllAddress(token:string) : Promise<ResponseAPIDelivery>;
    createAddres(address: Address , token:string ): Promise<ResponseAPIDelivery>;
}