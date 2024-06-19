
import interceptor from "@/api/interceptor";
import axiosInstance from "@/api/interceptor"
import { requestApiHelper } from "@/helpers/request";
import { User } from "@/types/user"

class UserService {

    static async getUsers() {
        let listUsers= await interceptor.get("users")
        return listUsers;
    }



}

export default UserService