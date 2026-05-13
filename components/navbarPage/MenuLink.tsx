import Link from 'next/link'
import React from 'react'
import { MenuAvatar } from '../MenuAvatar'
import { userImageProps } from '@/types/tblog'


function MenuLink({avatar}:userImageProps) {
  return (
    <div className='flex flex-col md:flex-row w-full md:w-auto '>
        <Link className='w-full text-2xl px-4 py-2 text-white font-intel border-2 md:border-l-2 flex-center' href={'/blog'}>Blog</Link>
        <Link className='w-full text-2xl px-4 py-2 text-white font-intel border-l-2 flex-center' href={'/my-blog'}>MyBlog</Link>
        <Link className='w-full text-2xl px-4 py-2 text-white font-intel border-2 flex-center' href={'/about'}>About</Link>
        <div className='mr-8 ml-8 p-5 md:p-1 flex-center '>
          <MenuAvatar avatar={avatar}/>
        </div>
        
    </div>
  )
}

export default MenuLink
