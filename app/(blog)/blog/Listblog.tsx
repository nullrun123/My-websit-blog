'use client'

import { useBlogStore } from '@/lib/blog-store'
import  { useEffect, useMemo } from 'react'
import { compareAsc, compareDesc, format } from 'date-fns';
import { CardImage } from '@/components/blog/CardImage';
import { usePathname } from 'next/navigation';
function Listblog({query}:{query:string}){
const fetchblog = useBlogStore((state)=>state.fetchBlog);
const blogs = useBlogStore((state)=>state.blogs);
const isLoading = useBlogStore((state)=>state.isLoading);
const sortorder = useBlogStore((state)=>state.sortorder);
const setSortOrder = useBlogStore((state)=>state.setSortOrder);
const pathname = usePathname();
const handleformatDate = (day:string)=>{
  const fDay = format(day, "yyyy-MM-dd");
  return fDay;
}


// filterblog สร้าง array มาเก็บquery ใหม่ห
  const filterBlogs = useMemo(() =>{
  if(!Array.isArray(blogs)) return [];

   const filterBlog = Array.isArray(blogs) ? blogs.filter((b)=>{
    return b.title?.toLowerCase().includes(query?.toLowerCase() ?? '');
  }) : [];

  if(!sortorder) return blogs;
  return [...filterBlog].sort((a,b)=>{
    return sortorder == 'asc' ? compareAsc(new Date(a.createAt),new Date(b.createAt)) : compareDesc(new Date(a.createAt),new Date(b.createAt))
  })
 
  }, [blogs,query, sortorder])

  useEffect(()=>{
     window.location.reload();
  },[])
  
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
              filterBlogs.length === 0 ?(
                <div>Cant find</div>
              ):(
                
                 filterBlogs.map((b)=>(
                  <li key={b.id}>
                    <CardImage id={b.id} title={b.title} desc={b.text} date={handleformatDate(b.createAt)} user={b.user} image={b.image}  /> 
                 </li>
              ))
             )
                  
                }
           
            </ul>
            
          )
        }
    </div>
  )
}

export default Listblog
