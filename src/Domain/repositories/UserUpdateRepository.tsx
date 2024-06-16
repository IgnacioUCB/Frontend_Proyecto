import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseApiDelivery";


export interface UserUpdateRepository {
    update(id: string, name: string, last_name: string, phone: string, session_token: string): Promise<ResponseAPIDelivery>;
    
}