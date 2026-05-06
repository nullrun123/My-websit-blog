'use client'

import { getServerSession } from '@/lib/get-session'
import Link from 'next/link';
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { Button } from './ui/button';
import MenuLink from './navbarPage/MenuLink';
import { FaXmark } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import Navlogin from './navbarPage/Navlogin';

function Navbar({ user }:any) {
    const [isOpen, setisOpen] = useState(false);
    

    const toggleNavbar = ()=>{
        setisOpen(!isOpen);
    }
  
  return (
    <>
    <div className='bg-secondary sticky top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between border-b border-gray-500 p-8'>
        <div className='h-16 w-16'>ww</div>
            <div className='w-1/3 justify-end items-center hidden md:flex '>
            {
                user ? (
                    <MenuLink/>
                   
                ): (
                    <Navlogin/>
                )   
            }
                
            </div>
        <div className='md:hidden'>      
            <Button onClick={toggleNavbar} >{isOpen ? <FaXmark/> : <IoMenu/>}</Button> 
        </div>
            {isOpen && (
        <div className='flex flex-col basis-full items-center'>
               {
                user ? (
                    <MenuLink/>
                   
                ): (
                    <Navlogin/>
                )   
            }
           
            </div>
        )}

    </div>
    </>
    
  )
}

export default Navbar


