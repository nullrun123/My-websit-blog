
import { getServerSession } from '@/lib/get-session'

import Myblog from './Myblog';

async function page() {
    const session= await getServerSession();
    const user = session?.user;

  
  return (
   <>
   <Myblog user={user}/>
   </>
  )
}

export default page
