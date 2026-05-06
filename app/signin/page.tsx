import React from 'react'
import { FormSignIn } from './form-signin'


function signin() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>
      <h1>Sign In</h1>
      <FormSignIn/>
    </div>
  )
}

export default signin
