"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function BudgetItem({ budget }) {

  const [isBudgetFull, setIsBudgetFull] = useState(false);
  useEffect(() => {
    if (budget?.totalSpend !== undefined && budget?.amount !== undefined) {
      setIsBudgetFull(budget.totalSpend >= budget.amount);
    }
  })
  const calculateProgressPerc = () => {
    if (!budget?.amount || budget.amount == 0)
      return 0;
    // (spend/total)*100
    const perc = (budget.totalSpend / budget.amount) * 100;
    return Math.min(100, perc.toFixed(2));
  }
  return (
    <div>
      <Link href={'/dashboard/expenses/' + budget?.id} >
        <div className='p-5 border  rounded-lg  hover:shadow-md cursor-pointer h-[170px] flex flex-col justify-between'>
          <div className='flex gap-5 items-center justify-between w-full'>
            <div className='flex gap-2 items-center'>
              <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
              <div>
                <h2 className='font-bold'>{budget?.name || 'Unnamed Budget'}</h2>


                <h2 className='text-sm text-gray-500'>
                  {budget?.totalItem || 0} Item
                </h2>

              </div>
            </div>
            <h2 className='font-bold text-primary text-lg'>${budget?.amount ?? 0}</h2>

          </div>


          <div className="mt-5">
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-xs text-slate-400'>${budget?.totalSpend ?? 0} Spend</h2>

              <h2 className='text-xs text-slate-400'>
                ${budget?.amount - (budget?.totalSpend ?? 0)} Remaining
              </h2>

            </div>
            <div className='w-full bg-slate-300 h-2 rounded-full'>
              <div className=' bg-primary h-2'
                style={{
                  width: `${calculateProgressPerc()}%`
                }

                }
              >

              </div>
            </div>
          </div>
        </div>
      </Link>
      {isBudgetFull && (
        <div className='mt-2 p-3 bg-red-100 text-red-600 border border-red-400 rounded-md'>
          <strong>Budet is Full</strong>Create a new budget or add extra funds.

        </div>
      )}
    </div>
  );
}

export default BudgetItem;
