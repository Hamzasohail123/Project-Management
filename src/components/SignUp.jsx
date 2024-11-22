import React from 'react'
import { SignUp } from '@clerk/clerk-react'

function SignUpCompo() {
  return (
    <div className='flex justify-center mt-3'><SignUp signInUrl='/signin'/></div>
  )
}

export default SignUpCompo