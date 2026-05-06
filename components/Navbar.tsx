import { getServerSession } from '@/lib/get-session'
import Link from 'next/link';
import { CgProfile } from "react-icons/cg";
async function Navbar() {
    const session = await getServerSession();

    if(session) {
        <div className=' h-[50px] w-full  flex justify-between mt-5'>
            <div className='w-2/4'></div>
        <div className='w-1/4 px-10 flex justify-end items-center '>      
            <Link className='bg-white rounded text-2xl px-4 py-2 text-black' href={'/'}><CgProfile /></Link>
        </div>

    </div>
    }
  return (
    <div className=' h-[50px] w-full  flex justify-between mt-5'>
        <div className='w-2/4'></div>
        <div className='w-1/4 px-10 flex justify-end items-center '>      
            <Link className='bg-white rounded text-2xl px-4 py-2 text-black font-intel' href={'/signin'}>Sign up</Link>
        </div>

    </div>
  )
}

export default Navbar
