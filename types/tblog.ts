import { User } from "@/app/generated/prisma/client";

export interface TypeBlog {
    id:string,
    title:string
    text:string
    createAt:string
    updateAt:string
}



export interface userImageProps {
  avatar:User;
}
