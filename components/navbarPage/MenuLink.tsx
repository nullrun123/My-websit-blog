import Link from 'next/link'
import React from 'react'
import { MenuAvatar } from '../MenuAvatar'
import { userImageProps } from '@/types/tblog'


function MenuLink({avatar}:userImageProps) {
  return (
    <div className='flex flex-col md:flex-row gap-6'>
        <Link className=' rounded text-2xl px-4 py-2 text-white font-intel' href={'/blog'}>Blog</Link>
        <Link className=' rounded text-2xl px-4 py-2 text-white font-intel' href={'/about'}>About</Link>
        <div className='mr-10 flex-center'>
          <MenuAvatar avatar={avatar}/>
        </div>
        
    </div>
  )
}

export default MenuLink
