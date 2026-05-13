
import { Metadata } from "next"

import Resetform from "./Resetform"


export const metadat: Metadata ={
    title:"Reset Password"
}

interface ResetPasswordProps {
    searchParams : Promise<{token:string}>
}

export default async function page({searchParams}:ResetPasswordProps) {

    const { token }  = await searchParams;

  return (
    <div className="w-full h-screen flex-center ">
        
     {
      token ? (
         <Resetform token={token}/>
      ):(
        <div role="alert" className="text-red-600">
          Token is missing.
        </div>
      )
     }
   
   </div>
  )
}

