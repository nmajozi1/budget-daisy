'use client'

import React, { useState } from 'react'

type TTotal = {
  total: number | undefined;
}

const Calculate = (props: TTotal) => {
  const [difference, setDifference] = useState<number>();
  const {total} = props;

  const calculateDifference = async (formData: FormData) => {
    const values = formData.get('income');
    setDifference(Number(values) - (total ? total : 0));
  }

  return (
    <dialog id="calculate_difference_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <span className="w-full flex justify-center">
          <h3 className="font-bold text-lg">Calculate Difference</h3>
        </span>
        <form action={calculateDifference} className="flex-col w-full mt-4">
          <input type="text" name="income" placeholder="Enter the income" className="input input-bordered w-full max-w-lg" />
          <button type="submit" className="btn btn-square btn-success btn-outline w-full mt-2">Calculate</button>
          {difference && (
            <div className='flex justify-end mt-4'><p className='text-slate-700 text-xl'>R{new Intl.NumberFormat('en-US').format(difference)}</p></div>
          )}
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default Calculate