import interceptor from "@/api/interceptor";
import axiosInstance from "@/api/interceptor"
import { requestApiHelper } from "@/helpers/request";
import { Post } from "@/types/post"

class PostService {

    static async getAllPosts() {
        let response = await requestApiHelper<Post[]>(
            interceptor.get("posts")
        )

        return response;
    }

    static async getPostById(id: number) {
        let response = await interceptor.get(`/posts/${id}`)  
                     return response;
    }


}

export default PostService