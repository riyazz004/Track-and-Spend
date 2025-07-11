"use client";

import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import { useParams, useRouter } from "next/navigation";  // ✅ Import useParams
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import EditBudget from '../_components/EditBudget';


function ExpensesScreen() {
    const { user } = useUser();
    const params = useParams();
    const [budgetInfo, setBudgetInfo] = useState(null);
    const [expensesList, setExpensesList] = useState([]);
    const route=useRouter();

    useEffect(() => {
        if (user && params?.id) {
            getBudgetInfo(params.id);
        }
    }, [user, params?.id]);

    /**
     * Get Budget Information 
     */
    const getBudgetInfo = async (budgetId) => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount}::numeric)`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, budgetId))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        getExpensesList();
    };

    /**
     * Get Latest Expenses
     */
    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id));
        setExpensesList(result);

        console.log(result)
    }

    /**
     * Used to Delete budget
     */
    const deleteBudget=async()=>{
        const deleteExpenseResult=await db.delete(Expenses)
        .where(eq(Expenses.budgetId,params.id))
        .returning()
        
        if(deleteExpenseResult)
        {
            const result = await db.delete(Budgets)
        .where(eq(Budgets.id,params.id))
        .returning();
        }
        toast('Budget Deleted!');
        route.replace('/dashboard/budgets');

      

    }

    return (
        <div className='p-10 max-w-[1200px] mx-auto '>
            
            <h2 className='text-2xl font-bold flex justify-between'>
             <span className='flex gap-2 items-center justify-start'>
                <ArrowLeft onClick={()=>route.back()} className='cursor-pointer'/>MyExpenses
             </span>
             <div className='flex gap-2 items-center'>
             <EditBudget budgetInfo={budgetInfo}
             refreshData={()=>getBudgetInfo(params.id)}
             />

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button className="flex gap-2" variant="destructive"> <Trash />Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your current budget along with expenses
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </div>
            </h2>

            <div className='grid grid-cols-1  md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
                )}
                {/* ✅ Pass a function that actually calls getBudgetInfo(params.id) */}
                <AddExpense budgetId={params.id} user={user} refreshData={() => getBudgetInfo(params.id)} />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg'> Latest Expenses</h2>
                <ExpenseListTable expensesList={expensesList}
                    refreshData={() => getBudgetInfo(params.id)}
                />
            </div>
        </div>
    );
}

export default ExpensesScreen;