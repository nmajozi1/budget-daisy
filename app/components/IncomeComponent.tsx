import { IItem } from "../types/item.type"
import Calculate from "./Calculate";
import DeleteIncomeItemModal from "./DeleteIncomeItemModal";
import NotFoundIcon from "./icons/NotFoundIcon";
import ImgClient from "./ImgClient";
import UpdateIncomeModal from "./UpdateIncomeModal";

type IIncome = {
  income: IItem [] | undefined | null
}

const IncomeComponent = (props: IIncome) => {
  const { income } = props;
  const totalAmount = income?.reduce((sum, item) => sum + item.amount, 0);
  const isIncome = income ? income?.length > 0 : false;

  return (
    <div className="card overflow-x-auto shadow-xl max-h-[450]">
      {isIncome ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {income?.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <ImgClient
                          alt="Avatar Tailwind CSS Component"
                          path='income.jpg'
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
                <th className='flex gap-2 pr-0 justify-center'>
                  <UpdateIncomeModal id={item._id?.toString()} />
                  <DeleteIncomeItemModal id={item._id?.toString()} />
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
            <span className='text-center'><p className='text-4xl mb-8'>No Income Items Found</p></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default IncomeComponent