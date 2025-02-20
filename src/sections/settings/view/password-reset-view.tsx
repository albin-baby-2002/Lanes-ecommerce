import React from 'react'
import ResetPasswordForm from '../reset-password-form'

const PasswordResetView = () => {
  return (
    (
      <div className="h-[calc(100vh-75px)]  ">
        <div className=" h-full rounded-md bg-white">
          <p className="px-8 pt-8 text-lg font-bold">Reset Password</p>
          <div className="lg:w-1/2 rounded-xl bg-white p-8">
            <ResetPasswordForm/>
          </div>
        </div>
      </div>
    )  )
}

export default PasswordResetView
