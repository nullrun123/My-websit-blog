"use client"

import { useBlogStore } from '@/lib/blog-store';
import { use, useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { TypeBlog } from '@/types/tblog';
import Image from 'next/image'
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
 
interface PropsId {
  id: string
}

function page(props: { params: Promise<PropsId> }) {
  const [data, setData] = useState<TypeBlog | null>(null);
  const getblog = useBlogStore((state) => state.getBlog);
  const isLoading = useBlogStore((state) => state.isLoading);
  const params = use(props.params);
  const id = params.id;

  const handleformatDate = (date:string)=>{
    if (!date) return "";
    const fDay = format(date, "yyyy-MM-dd");
    return fDay;
  }
    
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
          <div className='w-full h-full flex-center flex-col p-12 gap-5 relative'>
               <Button className='absolute top-5 left-5  md:left-40' variant="outline" size="icon" aria-label="Go Back">
                <Link href={'/blog'}>
                  <ArrowLeftIcon />
                 </Link> 
              </Button>
            <div className='w-full max-w-2xl mt-5'>
              <div className='h-100 w-full'>
                 <Image
                    src="/window.svg"
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
              </div>
              </div>

            <div className="flex w-full max-w-2xl flex-col gap-5">
              <h1 className='text-5xl'>{data?.title}</h1>
               <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              <p className='text-xl text-gray-300'>Date : {handleformatDate(data?.createAt)}</p>
              <p className='text-md border-2 w-full wrap-break-word'>&nbsp;&nbsp;{data?.text}</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default page
