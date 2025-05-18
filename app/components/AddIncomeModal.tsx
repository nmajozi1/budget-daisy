'use client'

import React, { useActionState } from 'react';
import { createIncome } from '../actions/income.action';

const AddIncomeModal = () => {
  const [state, action, pending] = useActionState(createIncome, undefined);

  return (
    <dialog id="add_income_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <span className="w-full flex justify-center">
          <h3 className="font-bold text-lg">New Item</h3>
        </span>
        <form action={action} className="flex-col w-full mt-4">
          <input type="text" name="item" placeholder="Enter income item" className="input input-bordered w-full max-w-lg" />
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.item?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}
          <input type="text" name="description" placeholder="Enter income item description" className="input input-bordered w-full max-w-lg mt-2" />
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.description?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}
          <input type="text" name="amount" placeholder="Enter net income amount" className="input input-bordered w-full max-w-lg mt-2" />
          {state?.error && <ul className='list-disc text-red-600 pl-4'>{state.error.amount?.map((error, index) => (<li key={index}>{error}</li>))}</ul>}
          <button disabled={pending} type="submit" className="btn btn-square btn-success btn-outline w-full mt-2">
            {pending && (<span className="loading loading-spinner"></span>)}
            Add
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default AddIncomeModal