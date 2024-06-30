export interface Payment {
    id?: string;
    amount: string,
    currency: string,
    description: string,
    payment_method?: string,
}