"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';

import ExpenseListTable from './_components/ExpenseListTable';



function MyExpenses() {
    const [budgetList,setBudgetList]=useState([]);
    const [expensesList,setExpensesList]=useState([]);
    const{user}=useUser();
    useEffect(()=>{
        user&&getBudgetList(); 
    },[user])
    /**
     * used to get budget list
     */
    const getBudgetList=async()=>{
        const result=await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(${Expenses.amount}::numeric)`.mapWith(Number),
            totalItem :sql `count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));
        
        setBudgetList(result);
        getAllExpenses();
            
    
        }
     /**
      * Used to get All Expenses belong to users
      */
    const getAllExpenses=async()=>{
      const result=await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdat:Expenses.createdat
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
     setExpensesList(result);
    
    }
  return (
    <div className='p-5'>
      <h2 className='font-bold text-lg'>Latest Expenses</h2>
            <ExpenseListTable
             expensesList={expensesList}
             refreshData={()=>getBudgetList()}
            />
          
    </div>
  )
}

export default MyExpenses