import Navbar from '@/components/Navbar';
import { getServerSession } from '@/lib/get-session';
import React from 'react'
import Listblog from './Listblog';
import Createblog from '@/components/blog/CreateBlog';
import Link from 'next/link';

async function Blog() {
  // const session = await getServerSession();
  // const user = session?.user;
  return (
    <div className='w-full h-full flex flex-col itmes-center justify-center'>
      <div className='w-full h-full flex flex-col items-center justify-center border-2'>
        <Link href={'/blog/create'}>create</Link>
        <Listblog/>
      </div>
     
    </div>
  )
}

export default Blog
