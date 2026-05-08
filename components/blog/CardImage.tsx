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
import Link from "next/link"

interface BlogProps {
    id:string,
    title:string,
    desc:string,
    date:string,
}

export function CardImage({id,title,desc,date}:BlogProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-200">{date}</p>
        <CardDescription>
          {desc.slice(0,20)+"...."}
        </CardDescription>
        
      </CardHeader>
      <CardFooter>
        <Button asChild  className="w-full"><Link href={`/blog/${id}`}>View Event</Link></Button>
      </CardFooter>
    </Card>
  )
}
