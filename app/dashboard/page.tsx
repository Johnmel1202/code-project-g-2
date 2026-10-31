import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import {
  getUserTransactions,
  getUserTransactionSummary,
} from "@/lib/transactions";

import { DashboardScreen } from "@/components/auth/dashboard";

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  const transactions = await getUserTransactions(user.id);

  const summary = await getUserTransactionSummary(user.id);

  return (
    <main className="h-screen w-full overflow-hiden flex items-center justify-center bg-[#1B2559] ">
      <div className="relative z-10 w-full flex justify-center">
        <DashboardScreen
          user={user}
          transactions={transactions}
          summary={summary}
          activeTab="home"
        />
      </div>
    </main>
  );
}