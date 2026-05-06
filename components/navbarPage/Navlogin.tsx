import Link from 'next/link'
import React from 'react'

function Navlogin() {
  return (
    <div>
      <Link className='bg-white rounded text-2xl px-4 py-2 text-black font-intel' href={'/signin'}>Sign up</Link>
    </div>
  )
}

export default Navlogin
