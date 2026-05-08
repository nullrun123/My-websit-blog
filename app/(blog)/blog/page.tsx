import Navbar from '@/components/Navbar';
import { getServerSession } from '@/lib/get-session';
import React from 'react'
import Listblog from './Listblog';
import Createblog from '@/components/blog/CreateBlog';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardImage } from '@/components/blog/CardImage';

async function Blog() {
  // const session = await getServerSession();
  // const user = session?.user;
  return (
    <div className='w-full min-h-screen flex flex-col itmes-center justify-center'>
      <div className='w-full h-full flex flex-col items-center justify-center border-2'>
        <Button>
                <Link href={'/blog/create'}>create Blog</Link>
        </Button>

      </div>
     
     <section className="border-2 h-screen  py-16 px-6">
      <div className="max-w-7xl mx-auto">
            <Listblog/>
      </div>
    </section>
     {/* <div className='border-2 min-h-full w-full p-5'>
      <Listblog/>
      <CardImage/>
      <CardImage/>
      <CardImage/>
     </div> */}
    </div>
  )
}

export default Blog
