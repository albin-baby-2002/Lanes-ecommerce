import React from 'react'
import ResetPasswordForm from '../reset-password-form'
import { Button } from '@/components/ui/button'

const PasswordResetView = () => {
  return (
    (
      <div className="h-[calc(100vh-75px)] bg-ceramic px-10 py-8">
        <div className="h-[calc(100vh-130px)] rounded-md bg-white">
          <p className="px-8 pt-8 text-lg font-bold">Reset Password</p>
          <div className="w-1/2 rounded-xl bg-white p-8">
            <ResetPasswordForm/>
            <div className="mt-8">
              <Button>Reset Password</Button>
            </div>
          </div>
        </div>
      </div>
    )  )
}

export default PasswordResetView
