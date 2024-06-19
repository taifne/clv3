export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
  }
  export interface like {
    id: number;
    username: string;

  }
  
  
 export  interface Comment {
    id: number;
    content: string;
    parentId: number | null;
    createdAt: string;
    deletedAt: string | null;
    user: User;
    likes:like[]|[],
    replies: Comment[];
  }
  export  interface CommentCreate {
    postId: number|null;
    content: string;
    parentId: number | null;
    userId: number|null;
    
 
  }
  export  interface CommentUpdate {
    content: string;
   likes:number[];
  }
  
export  type CommentData = Comment[];
  