'use client'

import React, { useActionState } from 'react'
import { goToRegister, login } from '../actions/user.action'
import UsernameIcon from './icons/UsernameIcon'
import PasswordIcon from './icons/PasswordIcon'
import AlertErrorMessage from './AlertErrorMessage'
import AddUser from './icons/AddUserIcon'
import LoginIcon from './icons/LoginIcon'

const LoginForm = () => {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '95vh', justifyContent: 'space-between'}}>
      <div className='flex justify-center'>
        <div className="card my-20 bg-base-100 w-1/3 shadow-xl">
          <form className="card-body gap-y-4" action={action}>
            <h2 className="card-title">Login</h2>
            
            <label className="input input-bordered flex items-center gap-2">
              <UsernameIcon />
              <input type="text" name="username" className="grow w-full max-w-xs" placeholder="Username" />
            </label>
            {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.username?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}

            <label className="input input-bordered flex items-center gap-2">
              <PasswordIcon />
              <input type="password" name="password" className="grow" placeholder="Password" />
            </label>
            {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.password?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}

            <div className="card-actions justify-between gap-px">
              <button disabled={pending} type="submit" className="btn btn-outline btn-neutral w-[49%]"><LoginIcon />Login</button>
              <button formAction={goToRegister} className="btn btn-outline btn-success w-[49%]"><AddUser />Register</button>
            </div>

            <button className="btn btn-link w-full">Forgot Password</button>
          </form>
        </div>
      </div>
      <div className="ml-4 w-96">
        <AlertErrorMessage open={state?.open} message={state?.message} />
      </div>
    </div>
  )
}

export default LoginForm