
import { Address } from "./Address";
export interface User {
    id?:             string;
    name:            string;
    last_name:        string;
    phone:           string;
    email:           string;
    image_url?:          string;
    password:        string;
    confirmPassword: string;
    session_token?:  string;
    role_id?:        number;
    address?:         Address;
}