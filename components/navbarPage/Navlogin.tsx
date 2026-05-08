import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function Navlogin() {
  return (
    <Button asChild>
      <Link className='bg-white rounded text-2xl px-4 py-2 text-black font-intel' href={'/signin'}>Sign up</Link>
    </Button>
      
  )
}

export default Navlogin
