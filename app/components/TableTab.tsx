'use client'

import { useState } from "react"
import { IItem } from "../types/item.type"
import BudgetComponent from "./BudgetComponent"
import Footer from "./Footer"
import Header from "./Header"
import IncomeComponent from "./IncomeComponent"

type TTableTab = {
  userData: string;
  itemsData: string;
  incomeData: string;
}

const TableTab = (props: TTableTab) => {
  const [budgetTabState, setBudgetTabState] = useState(true);
  const [incomeTabState, setIncomeTabState] = useState(false);

  const {userData, itemsData, incomeData} = props;

  const user = JSON.parse(userData);
  const items = JSON.parse(itemsData);
  const income = JSON.parse(incomeData);

  const paidItems = items?.filter((item: IItem) => item.paid);
  const unpaidItems = items?.filter((item: IItem) => !item.paid);

  const sumPaidItems = paidItems?.reduce((sum: number, item: IItem) => sum + item.amount, 0);
  const sumUnPaidItems = unpaidItems?.reduce((sum: number, item: IItem) => sum + item.amount, 0);
  const sum = sumPaidItems + sumUnPaidItems;

  const totAmount = items?.reduce((sum: number, item: IItem) => sum + item.amount, 0);
  const isItems = items ? items?.length > 0 : false;
  
  const totalIncomeAmount = income?.reduce((sum: number, item: IItem) => sum + item.amount, 0);

  const totalAmount = (totAmount ? totAmount : 0) - (sumPaidItems ? sumPaidItems : 0);

  const budgetTab = () => {
    setBudgetTabState(true);
    setIncomeTabState(false)
  }

  const incomeTab = () => {
    setBudgetTabState(false);
    setIncomeTabState(true);
  }

  return (
    <section style={{display: 'flex', padding: '2.5rem', flexDirection: 'column', justifyContent: 'space-between', height: '100vh'}}>
      <div>
        <Header header={'Budget'} name={user?.name} surname={user?.surname} />

        <div role="tablist" className="tabs tabs-bordered">
          {/* This is the first tab */}
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Budget" defaultChecked onClick={budgetTab} />
          <div role="tabpanel" className="tab-content pt-10">
            <BudgetComponent items={items} />
          </div>

          {/* This is the second tab */}
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Income" onClick={incomeTab} />
          <div role="tabpanel" className="tab-content pt-10">
            <IncomeComponent income={income} />
          </div>

          {/* This is the third tab */}
          {/* <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Plan" onClick={incomeTab} />
          <div role="tabpanel" className="tab-content pt-10">
            <IncomeComponent income={income} />
          </div> */}
        </div>

      </div>
      <Footer 
        total={budgetTabState ? totalAmount : totalIncomeAmount} 
        unpaid={sumUnPaidItems}
        paid={sumPaidItems}
        sum={sum}
        isItems={isItems} 
        showBudgetAdd={budgetTabState} 
        showIncomeAdd={incomeTabState} 
      />
    </section>
  )
}

export default TableTab