import Createblog from '@/components/blog/CreateBlog'
import { getServerSession } from '@/lib/get-session'
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
  const session = await getServerSession();
  if(!session) redirect('/signin');

  return (
    <div>
      <Createblog user={session.user}/>
    </div>
  )
}

export default page
