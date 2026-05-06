import React from 'react'
import { FormSignUp } from './form-signup'


function SignUp() {
  return (
   <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>
         <h1>Sign Up</h1>
         <FormSignUp/>
       </div>
  )
}

export default SignUp
