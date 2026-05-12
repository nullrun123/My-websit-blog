"use client"
import EditBlog from '@/components/blog/EditBlog';
import { useBlogStore } from '@/lib/blog-store';
import { TypeBlog } from '@/types/tblog';
import { use, useEffect, useState } from 'react'

interface PropsId {
  id: string
}


function page(props: { params: Promise<PropsId> }) {
      
    const [data, setData] = useState<TypeBlog | null>(null);
    const getblog = useBlogStore((state) => state.getBlog);
    const isLoading = useBlogStore((state) => state.isLoading);
    const params = use(props.params);
    const id = params.id;

    useEffect(()=>{
        const fetchData = async()=>{
            const result = await getblog(id);
            setData(result);
        }
        fetchData();
    }, [id, getblog])

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Not found</div>;

  return (
    <div>
      <EditBlog id={id} title={data.title} text={data.title}  image={data.image} />
    </div>
  )
}

export default page
