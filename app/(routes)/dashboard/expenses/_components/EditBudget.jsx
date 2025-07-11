"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  const { user } = useUser();

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db.update(Budgets)
      .set({
        name: name.trim(),
        amount: Number(amount),
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast.success('Budget Updated!');
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2"><PenBox /> Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budgets</DialogTitle>
            <DialogDescription>
              {/* ✅ Only the emoji button toggles the picker */}
              <div className='relative'>
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEmojiPicker(!openEmojiPicker);
                  }}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className='absolute z-20'>
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Budget Name</h2>
                <Input
                  placeholder="e.g. Home decor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. 5000$"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onUpdateBudget}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget;4