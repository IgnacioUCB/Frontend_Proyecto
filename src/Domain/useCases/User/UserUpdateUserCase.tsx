import { UserUpdateRepositoryImpl } from "../../../Data/repositories/UserUpdateRepository";


const {update} = new UserUpdateRepositoryImpl();

export const UserUpdateUseCase= async(id:string, name: string, last_name: string, phone: string, session_token: string) => {
    return await update(id, name, last_name, phone, session_token)
};