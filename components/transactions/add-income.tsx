"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings, CircleDollarSign } from "lucide-react";

import {
  addTransaction,
  type TransactionState,
} from "@/app/actions/transaction";

const initialState: TransactionState = {};

export const AddIncome = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    addTransaction,
    initialState,
  );

  return (
    <div className="w-full max-w-sm  min-h-screen bg-[#17175F] text-white flex flex-col overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go Back"
            className="p-1 rounded-full hover:bg-white/10 transition active:scale-95"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>

          <button
            type="button"
            onClick={() => alert("Settings screen is not available yet.")}
            aria-label="Settings"
            className="p-1 rounded-full hover:bg-white/10 transition active:scale-95"
          >
            <Settings className="w-8 h-8" />
          </button>
        </div>

        <h1 className="text-4xl font-bold text-center leading-none mt-5">
          Add Income
        </h1>

        <div className="flex justify-center mt-3">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-black">
            <CircleDollarSign className="w-16 h-16 stroke-[1.7]" />
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="flex-1 bg-white text-black rounded-t-[22px] px-6 pt-6 pb-8">
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="type" value="income" />

          <div>
            <label
              htmlFor="amount"
              className="block text-lg font-medium leading-none mb-1"
            >
              Amount
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              required
              className="w-full h-10 rounded-lg bg-[#DCE8F3] px-3 text-xl outline-none border border-transparent focus:border-[#35AAA5]"
            />
          </div>

          <div>
            <label
              htmlFor="source"
              className="block text-lg font-medium leading-none mb-1"
            >
              Income Source
            </label>

            <select
              id="source"
              name="source"
              required
              defaultValue=""
              className="w-full h-10 rounded-lg bg-[#DCE8F3] px-3 text-xl outline-none border border-transparent focus:border-[#35AAA5]"
            >
              <option value="" disabled>
                Select income source
              </option>
              <option value="Salary">Salary</option>
              <option value="Allowance">Allowance</option>
              <option value="Business Income">Business Income</option>
              <option value="Other Income">Other Income</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-lg font-medium leading-none mb-1"
            >
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              required
              className="w-full h-10 rounded-lg bg-[#DCE8F3] px-3 text-xl outline-none border border-transparent focus:border-[#35AAA5]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium leading-none mb-1"
            >
              Description (Optional)
            </label>

            <input
              id="description"
              name="description"
              type="text"
              placeholder="Monthly allowance, Busines income, Other income..."
              className="w-full h-10 rounded-lg bg-[#DCE8F3] px-3 text-xl outline-none border border-transparent focus:border-[#35AAA5]"
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
            className="w-full h-10 mt-7 rounded-lg bg-[#3AAFA9] text-black text-xl font-medium border border-[#1B2559] hover:bg-[#329F9A] transition active:scale-[0.98] disabled:opacity-60"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};