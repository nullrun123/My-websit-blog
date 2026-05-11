import { User } from "@/lib/auth"


export interface TypeBlog {
    id:string,
    title:string
    text:string
    createAt:string
    updateAt:string
    user:User
    image:string
    userId:string
}



export interface userImageProps {
  avatar:User;
}
