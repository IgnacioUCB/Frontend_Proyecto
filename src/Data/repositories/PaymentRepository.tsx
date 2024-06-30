import { AxiosError } from "axios";
import { Payment } from "../../Domain/entities/Payment";
import { PaymentRepository } from "../../Domain/repositories/PaymentRepository";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseApiDelivery";
import { ResponseVerifyTokenAPIDelivery } from "../sources/remote/api/models/ResponseVerifyTokenApiDelivery";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";

export class PaymentRepositoryImpl implements PaymentRepository {


    async createPayment(payment: Payment, token: string): Promise<ResponseAPIDelivery> {
        try {
            const {data} = await ApiDelivery.post('payments/', payment, {
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