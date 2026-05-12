'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { useBlogStore } from '@/lib/blog-store';
import { compareDesc, format } from 'date-fns';
import { usePathname } from 'next/navigation';
import { TypeBlog } from '@/types/tblog';

function ButtonFilterDate() {
    const setSortOrder = useBlogStore((state)=>state.setSortOrder);
    const [active, setactive] = useState(false);

    const handleDate = ()=>{
        setactive(!active);
        if(active){
            setSortOrder('asc');
        }else{
             setSortOrder('des');
        }
    }
  return (
    <>
          <Button variant="default" size="icon" aria-label="Submit" onClick={handleDate}>
            {
                active ? <ArrowUpIcon /> : <ArrowDownIcon/>
            }
            </Button>
    </>
  )
}

export default ButtonFilterDate
