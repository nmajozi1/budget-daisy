'use client'

import { useActionState } from "react"
import { goToLogin, register } from "../actions/user.action"
import AddUser from "./icons/AddUserIcon"
import BackArrow from "./icons/BackArrowIcon"
import EmailIcon from "./icons/EmailIcon"
import PasswordIcon from "./icons/PasswordIcon"
import UsernameIcon from "./icons/UsernameIcon"

const RegisterForm = () => {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <section className="flex justify-center">
      <div className="card my-20 bg-base-100 w-1/3 shadow-xl">
        <form className="card-body gap-y-4" action={action}>
          <h2 className="card-title">Register</h2>

          <label className="input input-bordered flex items-center gap-2">
            <UsernameIcon />
            <input type="text" name="name" className="grow w-full max-w-xs" placeholder="Name" />
          </label>
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.name?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}

          <label className="input input-bordered flex items-center gap-2">
            <UsernameIcon />
            <input type="text" name="surname" className="grow w-full max-w-xs" placeholder="Surname" />
          </label>
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.surname?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}

          <label className="input input-bordered flex items-center gap-2">
            <EmailIcon />
            <input type="email" name="email" className="grow w-full max-w-xs" placeholder="Email" />
          </label>
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.email?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}
          
          <label className="input input-bordered flex items-center gap-2">
            <UsernameIcon />
            <input type="text" name="username" className="grow w-full max-w-xs" placeholder="Username" />
          </label>
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.username?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}

          <label className="input input-bordered flex items-center gap-2">
            <PasswordIcon />
            <input name="password" type="password" className="grow" placeholder="Password" />
          </label>
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.password?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}

          <div className="card-actions justify-between gap-px">
            <button className="btn btn-outline btn-success w-[49%]" disabled={pending}>
              <AddUser />
              Register
            </button>
            <button formAction={goToLogin} className="btn btn-outline btn-info w-[49%]" disabled={pending}>
              <BackArrow />
              Back
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default RegisterForm