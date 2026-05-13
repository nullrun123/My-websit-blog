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
    <div className=' sticky top-0 z-[25] mx-auto flex flex-wrap w-full items-center justify-between bg-background border-b border-gray-700 h-full'>
        <div className='h-12 w-10 flex-center ml-5'>
            <img src="/logo.png" alt="logo blog" />
        </div>
            <div className='w-1/3 justify-end items-center hidden md:flex '>
            {
                user ? (
                    <MenuLink avatar={user}/>
                   
                ): (
                    <Navlogin/>
                )   
            }
                
            </div>
        <div className='md:hidden'>      
            <Button className='rounded-none p-6' onClick={toggleNavbar} >{isOpen ? <FaXmark/> : <IoMenu/>}</Button> 
        </div>
            {isOpen && (
        <div className='flex flex-col basis-full items-center'>
               {
                user ? (
                    <MenuLink avatar={user}/>
                   
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


