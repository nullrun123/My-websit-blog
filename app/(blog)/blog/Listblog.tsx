'use client'

import { useBlogStore } from '@/lib/blog-store'
import React, { useEffect } from 'react'
import { format } from 'date-fns';
import { CardImage } from '@/components/blog/CardImage';
import { usePathname } from 'next/navigation';
function Listblog() {
const fetchblog = useBlogStore((state)=>state.fetchBlog);
const blogs = useBlogStore((state)=>state.blogs);
const isLoading = useBlogStore((state)=>state.isLoading);
const pathname = usePathname();
const handleformatDate = (day:string)=>{
  const fDay = format(day, "yyyy-MM-dd");
  return fDay;
}
  


useEffect(()=>{
    fetchblog()
},[pathname])

  return (
    <div className='h-full'>

      {
          blogs.length === 0 ? (
            <div className=''>
             <h1 className='text-5xl'> No blog create this.</h1>
            </div>
          ):(
            <ul className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {
                 blogs.map((b)=>(
                  <li key={b.id}>
                    <CardImage id={b.id} title={b.title} desc={b.text} date={handleformatDate(b.createAt)}/> 
                 </li>
              ))
              }
            </ul>
            
          )
        }
    </div>
  )
}

export default Listblog
