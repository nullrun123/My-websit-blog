import React from 'react'
import Adminpage from './adminpage'
import { getServerSession } from '@/lib/get-session'
import { redirect } from 'next/navigation';

async function page() {
  const session = await getServerSession();
  const user = session?.user;

  console.log(user?.role)
  if(user?.role !== 'admin') return redirect('/');
  
  return (
    <>
    <Adminpage/>
    </>
  )
}

export default page
