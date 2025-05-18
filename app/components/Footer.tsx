'use client'

import { useEffect, useState } from "react";
import AddIncomeModal from "./AddIncomeModal";
import AddModal from "./AddModal";

type TTotal = {
  total: number | undefined;
  isItems: boolean;
  showBudgetAdd: boolean;
  showIncomeAdd: boolean;
  unpaid?: number;
  paid?: number;
  sum?: number; 
}

const Footer = (props: TTotal) => {
  const {isItems, showBudgetAdd, showIncomeAdd, unpaid, paid, sum, total} = props;

  const [profit, setProfit] = useState<number>();

  const onOpenDialog = () => (document.getElementById('add_item_modal') as HTMLDialogElement)?.showModal();
  const onOpenIncomeDialog = () => (document.getElementById('add_income_modal') as HTMLDialogElement)?.showModal();
  const onOpenDifferenceDialog = () => (document.getElementById('calculate_difference_modal') as HTMLDialogElement)?.showModal();

  useEffect(() => {
    if (showIncomeAdd && total && sum) {
      setProfit(total - sum);
    }
  }, [showIncomeAdd, total, sum]);

  return (
    <div className="flex w-full justify-between mt-10">
      <div className="flex gap-2">
        {showBudgetAdd && (<button className="btn btn-sm btn-outline btn-accent" onClick={onOpenDialog}>Add new item</button>)}
        {showIncomeAdd && (<button className="btn btn-sm btn-outline btn-accent" onClick={onOpenIncomeDialog}>Add new income item</button>)}
        {isItems && showBudgetAdd && (<button className="btn btn-sm btn-outline btn-secondary" onClick={onOpenDifferenceDialog}>Calculate difference</button>)}
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col">
          {showIncomeAdd ? (<>
            <p className="text-3xl text-slate-700">R{new Intl.NumberFormat('en-US').format(total as number)}</p>
            <p className="text-sm text-slate-700 text-center">{"{ income }"}</p>
          </>) : (<>
            <p className="text-3xl text-slate-700">R{new Intl.NumberFormat('en-US').format(unpaid as number)}</p>
            <p className="text-sm text-slate-700 text-center">{"{ unpaid }"}</p>
          </>)}
        </div>
        <p className="text-3xl text-slate-700 pb-4">+</p>
        <div className="flex flex-col">
          {showIncomeAdd ? (<>
            <p className="text-3xl text-slate-700">R{new Intl.NumberFormat('en-US').format(sum as number)}</p>
            <p className="text-sm text-slate-700 text-center">{"{ expenses }"}</p>
          </>) : (<>
            <p className="text-3xl text-slate-700">R{new Intl.NumberFormat('en-US').format(paid as number)}</p>
            <p className="text-sm text-slate-700 text-center">{"{ paid }"}</p>
          </>)}
        </div>
        <p className="text-3xl text-slate-700 pb-4">=</p>
        <div className="flex flex-col">
          {showIncomeAdd ? (<>
            <p className="text-3xl text-slate-700">R{new Intl.NumberFormat('en-US').format(profit as number)}</p>
            <p className="text-sm text-slate-700 text-center">{"{ profit }"}</p>
          </>) : (<>
            <p className="text-3xl text-slate-700">R{new Intl.NumberFormat('en-US').format(sum as number)}</p>
            <p className="text-sm text-slate-700 text-center">{"{ total }"}</p>
          </>)}
          
        </div>
      </div>
      <AddModal />
      <AddIncomeModal />
    </div>
  )
}

export default Footer;