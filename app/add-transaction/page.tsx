import Link from "next/link";

import {
  ArrowLeft,
  Settings,
  CircleDollarSign,
  WalletCards,
  PiggyBank,
} from "lucide-react";

export default function AddTransactionPage() {
  return (
    <main className="h-screen w-full overflow-hidden bg-[#1B2559]">
      <div className="h-screen w-full max-w-sm mx-auto bg-[#17175F] text-white flex flex-col overflow-hidden shadow-2xl">
        <div className="px-5 pt-6">
          <div className="flex items-center justify-between">
            <Link
              href="/home"
              aria-label="Back to Home"
              className="p-1 rounded-full text-white hover:bg-white/10 transition active:scale-95"
            >
              <ArrowLeft className="w-8 h-8" />
            </Link>

            <Link
              href="/settings"
              aria-label="Settings"
              className="p-1 rounded-full text-white hover:bg-white/10 transition active:scale-95"
            >
              <Settings className="w-8 h-8" />
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-center leading-none mt-10">
            Add Transaction
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 gap-5 pb-8">
          <Link
            href="/add-income"
            className="w-full bg-white text-[#101653] rounded-2xl px-5 py-5 flex items-center gap-5 hover:bg-[#36ADA3] hover:text-white transition active:scale-[0.98]"
          >
            <div className="w-16 h-16 rounded-full bg-[#DCE8F3] flex items-center justify-center shrink-0">
              <CircleDollarSign className="w-10 h-10" />
            </div>

            <div className="min-w-0">
              <h2 className="text-3xl font-bold leading-none">Add Income</h2>

              <p className="text-lg opacity-70 leading-none mt-2">
                Record money received
              </p>
            </div>
          </Link>

          <Link
            href="/add-expense"
            className="w-full bg-white text-[#101653] rounded-2xl px-5 py-5 flex items-center gap-5 hover:bg-[#36ADA3] hover:text-white transition active:scale-[0.98]"
          >
            <div className="w-16 h-16 rounded-full bg-[#DCE8F3] flex items-center justify-center shrink-0">
              <WalletCards className="w-10 h-10" />
            </div>

            <div className="min-w-0">
              <h2 className="text-3xl font-bold leading-none">Add Expense</h2>

              <p className="text-lg opacity-70 leading-none mt-2">
                Record money spent
              </p>
            </div>
          </Link>

          <Link
            href="/savings"
            className="w-full bg-white text-[#101653] rounded-2xl px-5 py-5 flex items-center gap-5 hover:bg-[#36ADA3] hover:text-white transition active:scale-[0.98]"
          >
            <div className="w-16 h-16 rounded-full bg-[#DCE8F3] flex items-center justify-center shrink-0">
              <PiggyBank className="w-10 h-10" />
            </div>

            <div className="min-w-0">
              <h2 className="text-3xl font-bold leading-none">Add Savings</h2>

              <p className="text-lg opacity-70 leading-none mt-2">
                Record your savings
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}