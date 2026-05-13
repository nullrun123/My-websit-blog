import Navbar from '@/components/Navbar';
import { getServerSession } from '@/lib/get-session'

import ProfileImage from './ProfileImage';
import ChangeUser from '@/components/profile/ChangeUser';

async function page() {
    const session = await getServerSession();
    const user = session?.user;
    console.log(user);
  return (
    <div className='w-full'>
      <Navbar user={user}/>
       <div className='w-full min-h-screen flex flex-col p-10 border-2'>
          <h1 className='text-4xl'>Personal Information</h1>
          <p>Update your photo and personal details</p>
          { 
        user && (
          <ProfileImage user={user}/>
        )
      }
   
    </div>
    <div>
      <ChangeUser user={user}/>
    </div>
     
    </div>
  )
}

export default page
