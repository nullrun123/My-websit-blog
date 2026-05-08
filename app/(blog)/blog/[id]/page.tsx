'use client'

import { useBlogStore } from '@/lib/blog-store';
import { use, useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { TypeBlog } from '@/types/tblog';
interface PropsId {
  id: string
}

function page(props: { params: Promise<PropsId> }) {
  const [data, setData] = useState<TypeBlog | null>(null);
  const getblog = useBlogStore((state) => state.getBlog);
  const isLoading = useBlogStore((state) => state.isLoading);
  const params = use(props.params);
  const id = params.id;
  useEffect(() => {
    const fetchData = async () => {
      const result = await getblog(id);
      setData(result);
      // console.log(result);       
    };

    fetchData();
  }, [id])

  return (
    <>
      {
        isLoading ? (
          <div className='w-full h-full flex-center flex-col p-12 gap-5'>
            <div className='w-full max-w-2xl '>
              <Skeleton className="h-100 w-full" /> </div>
            <div className="flex w-full max-w-2xl flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="flex w-full max-w-2xl flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex-center flex-col p-12 gap-5'>
            <div className='w-full max-w-2xl'><div className='h-100 w-full'>IMG</div></div>

            <div className="flex w-full max-w-2xl flex-col gap-2">
              <h1 className='text-5xl'>{data?.title}</h1>
              <p className='text-xl'>{data?.text}</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default page
