import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { User } from "@/lib/auth"
import Link from "next/link"
import { AlertDelbtn } from "../button/AlertDelbtn"

interface BlogProps {
    id:string,
    title:string,
    desc:string,
    date:string,
    image:string
    user:User,
    IsDelete?:boolean,
    isEdit?:boolean
}

export function CardImage({id,title,image,desc,date,user,IsDelete=false,isEdit=false}:BlogProps) {

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={image}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-100"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <h1 className="text-md">createBy: 
          {
            user?.name ? (
               user.name.length >= 15 ? user.name.slice(0,15)+"..." : user.name
            ):"Unknown"
           
          }
        </h1>
        <p className="text-sm text-gray-200">{date}</p>
        
        
      </CardHeader>
      <CardFooter>
        
        {
          IsDelete ? (
            <div className="flex gap-2">
              <Button asChild  className="w-full"><Link href={isEdit ? `/blog/edit/${id}` : `/blog/${id}`}>View Event</Link></Button>
                <AlertDelbtn  id={id}/>
            </div>
          ):(
            <Button asChild  className="w-full"><Link href={isEdit ? `/blog/edit/${id}` : `/blog/${id}`}>View Event</Link></Button>
          )
        }
      </CardFooter>
    </Card>
  )
}
