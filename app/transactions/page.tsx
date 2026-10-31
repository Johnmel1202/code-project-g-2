import Link from "next/link";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { getUserTransactions } from "@/lib/transactions";

import {
  ArrowLeft,
  Settings,
  Home,
  FileText,
  Plus,
  Wallet,
  CircleUser,
  CircleDollarSign,
  ReceiptText,
} from "lucide-react";

type FilterType = "all" | "income" | "expenses";

type TransactionsPageProps = {
  searchParams: Promise<{
    type?: string;
  }>;
};

const formatMoney = (amount: number) => {
  return `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (date: string) => {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatShortDate = (date: string) => {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
  });
};

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;

  const requestedType = params.type;

  const activeFilter: FilterType =
    requestedType === "income"
      ? "income"
      : requestedType === "expenses"
        ? "expenses"
        : "all";

  const transactions = await getUserTransactions(user.id);

  const filteredTransactions =
    activeFilter === "all"
      ? transactions
      : transactions.filter((transaction) =>
          activeFilter === "income"
            ? transaction.type === "income"
            : transaction.type === "expense",
        );

  /*
   * Group transactions by date
   */
  const groupedTransactions = filteredTransactions.reduce<
    Record<string, typeof filteredTransactions>
  >((groups, transaction) => {
    const date = transaction.date;

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(transaction);

    return groups;
  }, {});

  const groupedDates = Object.keys(groupedTransactions).sort(
    (a, b) =>
      new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime(),
  );

  return (
    <main className="h-screen w-full overflow-y-auto bg-[#1B2559]">
      <div className="h-screen w-full max-w-sm mx-auto bg-[#E5EBF7] text-[#101653] flex flex-col shadow-2xl overflow-hidden">
        
        <div className="bg-[#17175F] text-white px-4 pt-6 pb-4 shrink-0">
          <div className="flex items-center justify-between">
            {/* BACK TO HOME */}
            <Link
              href="/home"
              aria-label="Back to Home"
              className="p-1 rounded-full hover:bg-white/10 transition active:scale-95"
            >
              <ArrowLeft className="w-8 h-8" />
            </Link>

         
            <Link
              href="/settings"
              aria-label="Settings"
              className="p-1 rounded-full hover:bg-white/10 transition active:scale-95"
            >
              <Settings className="w-7 h-7" />
            </Link>
          </div>

         
          <h1 className="text-4xl font-bold text-center leading-none mt-6">
            Transactions
          </h1>

          
          <div className="grid grid-cols-3 gap-1.5 mt-4">
            
            <Link
              href="/transactions"
              className={`h-9 rounded-xl flex items-center justify-center text-lg leading-none transition ${
                activeFilter === "all"
                  ? "bg-[#36ADA3] text-white"
                  : "bg-white text-[#101653] hover:bg-[#36ADA3] hover:text-white"
              }`}
            >
              All
            </Link>

          
            <Link
              href="/transactions?type=income"
              className={`h-9 rounded-xl flex items-center justify-center text-lg leading-none transition ${
                activeFilter === "income"
                  ? "bg-[#36ADA3] text-white"
                  : "bg-white text-[#101653] hover:bg-[#36ADA3] hover:text-white"
              }`}
            >
              Income
            </Link>

           
            <Link
              href="/transactions?type=expenses"
              className={`h-9 rounded-xl flex items-center justify-center text-lg leading-none transition ${
                activeFilter === "expenses"
                  ? "bg-[#36ADA3] text-white"
                  : "bg-white text-[#101653] hover:bg-[#36ADA3] hover:text-white"
              }`}
            >
              Expenses
            </Link>
          </div>
        </div>

      
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
          {filteredTransactions.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center mt-2">
              <ReceiptText className="w-12 h-12 mx-auto text-gray-400" />

              <p className="text-xl text-gray-400 mt-3">No transactions yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {groupedDates.map((date) => (
                <section key={date}>
                  {/* DATE */}
                  <h2 className="text-xl font-semibold leading-none px-2 mb-2">
                    {formatDate(date)}
                  </h2>

                  <div className="space-y-2">
                    {groupedTransactions[date].map((transaction) => {
                      const isIncome = transaction.type === "income";

                      const title = isIncome
                        ? transaction.source || "Income"
                        : transaction.category || "Expense";

                      return (
                        <div
                          key={transaction.id}
                          className="bg-[#D8D8D8] rounded-lg px-3 py-2 flex items-center gap-2"
                        >
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-medium leading-none truncate">
                              {title}
                            </p>

                            {transaction.description && (
                              <p className="text-xs text-gray-500 leading-none mt-1 truncate">
                                {transaction.description}
                              </p>
                            )}
                          </div>

                        
                          <p
                            className={`text-base font-medium leading-none whitespace-nowrap ${
                              isIncome ? "text-[#159447]" : "text-red-500"
                            }`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatMoney(transaction.amount)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center text-gray-700 z-10">
          
          <Link
            href="/home"
            className="flex flex-col items-center text-base leading-none hover:text-[#36ADA3] transition"
          >
            <Home className="w-6 h-6 mb-0.5" />
            <span>Home</span>
          </Link>

         
          <Link
            href="/transactions"
            className="flex flex-col items-center text-base leading-none text-[#36ADA3]"
          >
            <FileText className="w-6 h-6 mb-0.5" />
            <span>Transaction</span>
          </Link>

          
          <div className="-mt-7">
            <Link
              href="/add-transaction"
              aria-label="Add Transaction"
              className="w-14 h-14 rounded-full bg-white border-2 border-[#101653] flex items-center justify-center text-[#101653] shadow-lg hover:bg-[#101653] hover:text-white transition active:scale-90"
            >
              <Plus className="w-8 h-8" />
            </Link>
          </div>

         
          <Link
            href="/budget"
            className="flex flex-col items-center text-base leading-none hover:text-[#36ADA3] transition"
          >
            <Wallet className="w-6 h-6 mb-0.5" />
            <span>Budget</span>
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center text-base leading-none hover:text-[#36ADA3] transition"
          >
            <CircleUser className="w-6 h-6 mb-0.5" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </main>
  );
}