import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { getUserTransactions } from "@/lib/transactions";
import { ExpensesDashboard } from "@/components/auth/expenses-dashboard";

export default async function ExpensesPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  const transactions = await getUserTransactions(user.id);

  const totalBalance = transactions.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      return balance + transaction.amount;
    }

    return balance - transaction.amount;
  }, 0);

  return (
    <main className="min-h-screen w-full">
      <ExpensesDashboard
        transactions={transactions}
        totalBalance={totalBalance}
      />
    </main>
  );
}