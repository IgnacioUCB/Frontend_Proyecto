import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const { changePassword } = new AuthRepositoryImpl();

export const ChangePasswordUseCase = async (email: string, password : string, newPassword : string) => {
    return await changePassword(email, password, newPassword);
}