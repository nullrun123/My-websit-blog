import Link from 'next/link'
import React from 'react'

function MenuLink() {
  return (
    <div className='flex flex-col md:flex-row gap-5'>
        <Link className=' rounded text-2xl px-4 py-2 text-white font-intel' href={'/blog'}>Blog</Link>
        <Link className=' rounded text-2xl px-4 py-2 text-white font-intel' href={'/about'}>About</Link>
    
    </div>
  )
}

export default MenuLink
