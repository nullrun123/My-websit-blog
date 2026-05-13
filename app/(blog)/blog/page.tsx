import Navbar from '@/components/Navbar';
import { getServerSession } from '@/lib/get-session';
import React from 'react'
import Listblog from './Listblog';
import Createblog from '@/components/blog/CreateBlog';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardImage } from '@/components/blog/CardImage';
import { SearchInput } from '@/components/SearchBlog';

// สร้าง search มารับ ค่าของ query ว่าที่กรอกมาคืออะไร
// โดยส่งมาจาก  router.replace(`${pathname}?${params.toString()}`)
async function Blog({searchParams}:{
  searchParams?: Promise<{ query?: string }> 
}) {
  const { query } = await searchParams;
  const q =  query || ''
  return (
    <div className='w-full h-full flex flex-col itmes-center justify-center p-2.5 pt-5'>
      <div className=' h-full flex-center border-2'>
      <SearchInput/>
      </div>
     <section className="border-2 h-full  py-8 px-6">
      <div className="max-w-7xl mx-auto">
            <Listblog query={q}/>
      </div>
    </section>
    </div>
  )
}

export default Blog
