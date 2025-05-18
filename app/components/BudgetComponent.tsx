import React from 'react'
import NotFoundIcon from './icons/NotFoundIcon'
import UpdateModal from './UpdateModal'
import DeleteItemModal from './DeleteItemModal'
import Calculate from './Calculate'
import ImgClient from './ImgClient'
import { IItem } from '../types/item.type'
import UpdatePaid from './UpdatePaid'

type IBudget = {
  items: IItem [] | undefined;
}

const BudgetComponent = (props: IBudget) => {
  const { items } = props;

  const paidItems = items?.filter((item) => item.paid);
  const sumPaidItems = paidItems?.reduce((sum, item) => sum + item.amount, 0);

  const totAmount = items?.reduce((sum, item) => sum + item.amount, 0);
  const isItems = items ? items?.length > 0 : false;

  const totalAmount = (totAmount ? totAmount : 0) - (sumPaidItems ? sumPaidItems : 0);

  return (
    <div className="card overflow-x-auto shadow-xl max-h-[300] md:max-h-[350] lg:max-h-[450] 2xl:max-h-[600]">
      {isItems ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <ImgClient
                          alt="Avatar Tailwind CSS Component"
                          path='/moneyThree.jpg'
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td>
                  R{new Intl.NumberFormat('en-US').format(item.amount)}
                </td>
                <td>
                  <UpdatePaid id={item._id?.toString()} paid={item.paid} />
                </td>
                <th className='flex gap-2 pr-0 justify-center'>
                  <UpdateModal id={item._id?.toString()} />
                  <DeleteItemModal id={item._id?.toString()} />
                  <Calculate total={totalAmount} />
                </th>
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <div className='flex justify-center'>
          <div>
            <NotFoundIcon />
            <span className='text-center'><p className='text-4xl mb-8'>No Items Found</p></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default BudgetComponent