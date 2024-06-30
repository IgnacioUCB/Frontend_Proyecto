
import { AxiosError } from "axios";
import { Address } from "../../Domain/entities/Address";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseApiDelivery";
import { ResponseVerifyTokenAPIDelivery } from "../sources/remote/api/models/ResponseVerifyTokenApiDelivery";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";


export class AddressRepositoryImpl implements AddressRepository {

    async getAllAddress(UserId:string ,token: string): Promise<ResponseAPIDelivery> {
        try {
            const {data} = await ApiDelivery.get<ResponseAPIDelivery>(`address/getAll/${UserId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async createAddres(address: Address, token: string): Promise<ResponseAPIDelivery> {
        try {
            const {data} = await ApiDelivery.post('address/' , address, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            } )

            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }
}