import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseApiDelivery";
import { Payment } from "../entities/Payment";

export interface PaymentRepository {
    createPayment(payment: Payment , token:string ): Promise<ResponseAPIDelivery>;
}