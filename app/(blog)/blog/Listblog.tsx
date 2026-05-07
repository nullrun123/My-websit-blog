'use client'

import { useBlogStore } from '@/lib/blog-store'
import React, { useEffect } from 'react'

function Listblog() {

  
const fetchblog = useBlogStore((state)=>state.fetchBlog);
const blogs = useBlogStore((state)=>state.blogs);
const isLoading = useBlogStore((state)=>state.isLoading);

useEffect(()=>{
    fetchblog()
},[])
  return (
    <div className=''>
      <ul className=''>
        {blogs.map((b)=>(
            <li key={b.id}><h1>{b.title}</h1>
            <p>Date: {b.createAt}</p></li>
        ))}
      </ul>
    </div>
  )
}

export default Listblog
