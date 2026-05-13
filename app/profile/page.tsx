import { getServerSession } from '@/lib/get-session'
import React from 'react'

async function page() {
    const session = await getServerSession();
    const user = session?.user;
    console.log(user);
  return (
    <div>
      
    </div>
  )
}

export default page
