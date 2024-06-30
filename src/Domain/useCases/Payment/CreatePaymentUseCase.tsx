import { PaymentRepositoryImpl } from "../../../Data/repositories/PaymentRepository";
import { Payment } from "../../entities/Payment";

const {createPayment} = new PaymentRepositoryImpl()

export const CreatePaymentUSeCase = async (payment:Payment, payment_method:string) => {

    return await createPayment(payment,payment_method);
}