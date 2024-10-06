import {  SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='auth-page'>
        <SignUp routing="hash" />
    </main>
  )
}

export default SignUpPage