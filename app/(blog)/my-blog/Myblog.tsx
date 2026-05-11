'use client'

import { CardImage } from '@/components/blog/CardImage';
import { User } from '@/lib/auth'
import { useBlogStore } from '@/lib/blog-store';
import { TypeBlog } from '@/types/tblog';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

interface UserProps{
    user:any,
}
function Myblog({user}:UserProps) {

    const [MBlog, setMBlog] = useState<TypeBlog[]>([]);
    const fetchblog = useBlogStore((state)=>state.fetchBlog);
    const blogs = useBlogStore((state)=>state.blogs);

    useEffect(()=>{
        fetchblog();
    },[fetchblog])

    useEffect(()=>{
        if(user && blogs.length !== 0){
            const filters = blogs.filter((b)=> b.userId === user.id);
            setMBlog(filters);
        }

    },[blogs,user])

    const handleformatDate = (day:string)=>{
      const fDay = format(day, "yyyy-MM-dd");
      return fDay;
    }
      
    
  
  return (
     <div className='h-full p-5 flex-center flex-col gap-5'>
    
        <h1 className='text-4xl font-extrabold '>My Blogs</h1>
          {
              MBlog.length === 0 ? (
                <div className=''>
                 <h1 className='text-5xl'> No blog create this.</h1>
                </div>
              ):(
                <ul className='grid grid-cols-1 md:grid-cols-3 gap-8  w-full p-2'>
                  {
                     MBlog.map((b)=>(
                      <li key={b.id}>
                        <CardImage id={b.id} title={b.title} desc={b.text} date={handleformatDate(b.createAt)} user={b.user} IsDelete={true} image={b.image}/> 
                     </li>
                  ))
                  }
                </ul>
                
              )
            }
        </div>
  )
}

export default Myblog
