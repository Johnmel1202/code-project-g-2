import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { getUserTransactions } from "@/lib/transactions";
import { IncomeDashboard } from "@/components/auth/income-dashboard";

export default async function IncomePage() {
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
      <IncomeDashboard
        transactions={transactions}
        totalBalance={totalBalance}
      />
    </main>
  );
}