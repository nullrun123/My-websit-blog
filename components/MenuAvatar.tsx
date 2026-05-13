import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { userImageProps } from "@/types/tblog"
import Link from "next/link"




export function MenuAvatar({avatar}:userImageProps) {
    const router = useRouter();

    
    const Logoutuser = async()=>{

      const { error } =  await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin"); 
            },
        },
    });
    if(error){
      console.error("Failed to Logout ",error)
    }

    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {
            avatar.image ? (
             <Avatar>
              <AvatarImage src={avatar.image} alt={avatar.name} />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
  
            ):(
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            )
          }
          
        </Button>
      </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={'/profile'}>
             <UserIcon />
          Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={Logoutuser}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
