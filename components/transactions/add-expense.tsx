
"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings, WalletCards } from "lucide-react";

import {
  addTransaction,
  type TransactionState,
} from "@/app/actions/transaction";

const initialState: TransactionState = {};

const inputClass =
  "block w-full min-w-0 h-11 rounded-lg bg-[#DCE8F3] px-3 text-lg outline-none border border-transparent focus:border-[#35AAA5] appearance-none placeholder:text-sm placeholder:text-gray-500 placeholder:text-ellipsis";

export const AddExpense = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    addTransaction,
    initialState,
  );

  return (
    <div className="w-full max-w-sm min-h-dvh bg-[#17175F] text-white flex flex-col overflow-x-hidden shadow-2xl">
      <div className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go Back"
            className="p-1.5 rounded-full hover:bg-white/10 transition active:scale-95"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={() => alert("Settings screen is not available yet.")}
            aria-label="Settings"
            className="p-1.5 rounded-full hover:bg-white/10 transition active:scale-95"
          >
            <Settings className="w-7 h-7" />
          </button>
        </div>

        <h1 className="text-4xl font-bold text-center leading-none mt-4">
          Add Expense
        </h1>

        <div className="flex justify-center mt-3">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-black">
            <WalletCards className="w-12 h-12 stroke-[1.7]" />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white text-black rounded-t-[22px] px-5 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="type" value="expense" />

          <div>
            <label
              htmlFor="amount"
              className="block text-base font-medium leading-none mb-1.5"
            >
              Amount
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              inputMode="decimal"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium leading-none mb-1.5"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="School expenses">School expenses</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-base font-medium leading-none mb-1.5"
            >
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              required
              className={`${inputClass} text-left`}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-base font-medium leading-none mb-1.5"
            >
              Description (Optional)
            </label>

            <input
              id="description"
              name="description"
              type="text"
              placeholder="e.g. Food, Transportation, School"
              className={inputClass}
            />
          </div>

          {state.error && (
            <p className="text-red-500 text-base text-center pt-1">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 mt-6 rounded-lg bg-[#3AAFA9] text-black text-xl font-medium border border-[#1B2559] hover:bg-[#329F9A] transition active:scale-[0.98] disabled:opacity-60"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};
