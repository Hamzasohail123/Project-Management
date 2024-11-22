import React from 'react'
import { SignIn } from '@clerk/clerk-react'

function SignInCompo() {
  return (
    <div  className='flex justify-center mt-3'>
        <SignIn signUpUrl='/signup'/>
    </div>
  )
}

export default SignInCompo