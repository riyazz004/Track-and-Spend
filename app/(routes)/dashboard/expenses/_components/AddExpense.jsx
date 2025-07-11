import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema'; // ✅ Import Expenses
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const addNewExpense = async () => {
        console.log("Adding new expense...");
        
        if (!budgetId) {
            console.log("Error: Budget ID missing!");
            toast.error("Error: Budget ID is missing!");
            return;
        }

        const numericAmount = Number(amount) || 0; // Ensure amount is a valid number

        const result = await db.insert(Expenses).values({
            name: name.trim(),
            amount: numericAmount,
            budgetId: budgetId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        });

        console.log("Expense Added:", result);

        if (result) {
            console.log("refreshData type:", typeof refreshData);

            if (typeof refreshData === "function") {
                refreshData();  // ✅ Refresh the budget data after adding an expense
            } else {
                console.error("refreshData is not a function!");
            }

            toast.success("New Expense Added"); // ✅ Ensure this runs
            setName('');
            setAmount('');
        }
    };

    return (
        <div className="border p-5 rounded-lg">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input 
                    placeholder="e.g. Home decor"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input 
                    placeholder="e.g. 1000"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </div>
            <Button 
                disabled={!(name && amount)} 
                onClick={addNewExpense} 
                className="mt-2 w-full"
            >
                Add New Expense
            </Button>
        </div>
    );
}

export default AddExpense;