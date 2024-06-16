import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseApiDelivery";
import mime from 'mime';
import { ImageInfo, ImagePickerAsset } from "expo-image-picker";

export class AuthRepositoryImpl implements AuthRepository {
    async register(user: User): Promise<ResponseAPIDelivery> {
        try {
            console.log(user);
            user.role_id = 2;
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('auth/register', user);
            return Promise.resolve(data)

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async login(email: string, password: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('auth/login', { email, password });
            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async changePassword(email: string, password: string, newPassword: string): Promise<ResponseAPIDelivery> {
        try {
            const request = {
                email : email,
                newPassword : password,
                confirmPassword : newPassword
            }
            const { data } = await ApiDelivery.put<ResponseAPIDelivery>('user/change-password', request);
            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }
}