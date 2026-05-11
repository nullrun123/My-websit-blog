import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { MdArrowOutward } from "react-icons/md";
function Navlogin() {
  return (
   <div className='border h-full w-35'>
  <Link 
  className='flex items-center bg-white gap-1.5 h-full w-full text-xl text-black font-intel p-3' 
  href={'/signin'}
>
  sign-up <MdArrowOutward />
</Link>
</div>
      
  )
}

export default Navlogin
