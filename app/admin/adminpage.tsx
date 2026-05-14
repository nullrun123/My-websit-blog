'use client'

import { User } from '@/lib/auth';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from 'react'
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { GoUnverified } from "react-icons/go";
import { ComboboxAutoHighlight } from '@/components/button/ComboboxAutoHighlight';

import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface UserProps{
  id:String  
  name:String
  email:String
  emailVerified:Boolean  
  image:String
  role:String
  createdAt:String
}


function Adminpage() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [allUser, setAllUser] = useState<UserProps[] | []>([]);
  const hasfetch = useRef(false);

  const getalluser = async()=>{

    if(hasfetch.current) return;
    setIsLoading(true);

    try{  
      const res = await fetch('/api/user')

      if(!res.ok){
        setError("Failed to fetch data");
        return;
      }
      
      const response = await res.json();
      setAllUser(response.data);
      hasfetch.current = true
    }catch(error){
      console.log("error msg: ",error);
      setError("Failed to find user");
    }finally{
      setIsLoading(false);
    }

  }

  useEffect(()=>{
    getalluser();
  
  },[])



  if(isLoading) return <div className='w-full h-full flex-center mt-20'>Loading user...</div>

  if(error) return <div>{error}</div>



  return (
    <div className='w-screen h-full p-5 pt-15 md:p-20 flex-center flex-col'>

          <Button className='absolute top-3 left-5  md:left-10 md:top-10' variant="outline" size="icon" aria-label="Go Back">
                <Link className='w-full h-full flex-center' href={'/blog'}>
                  <ArrowLeftIcon />
                 </Link> 
              </Button>
      <div className='w-full flex flex-col border-2 gap-5'>
        <h1 className='text-2xl md:text-4xl'>All Account </h1>
         <ul className='flex w-full flex-col gap-5 '>
      {
        allUser.map((user: { id: { toString: () => any; }; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; emailVerified: any; role: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; },index: number)=>(
          <li className='flex gap-1 md:gap-4  w-full  text-xs md:text-xl' key={user.id?.toString() || index}>
            {index+1}. 
            <div className=' md:w-3xs'>
               { user.name } 
              </div>
              <div className=' w-[140px] md:w-[430px] flex gap-2'>
                | email: {user.email} 
                <div className='flex-center'>
                   {user.emailVerified ? <RiVerifiedBadgeLine /> : <GoUnverified /> } 
                  </div>
              </div>

          
            | role: <ComboboxAutoHighlight id={user.id?.toString()} role={user.role || 'user'}/>
            </li>
        ))
      }
     </ul>
      </div>
    </div>
  )
}

export default Adminpage
