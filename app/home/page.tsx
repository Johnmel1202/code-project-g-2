import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import {
  getUserTransactions,
  getUserTransactionSummary,
} from "@/lib/transactions";

import { DashboardScreen } from "@/components/auth/dashboard";

export default async function HomePage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  const transactions = await getUserTransactions(user.id);

  const summary = await getUserTransactionSummary(user.id);

  return (
    <main className="h-screen w-full flex items-center overflow-hidden justify-center bg-[#1B2559] p-4">
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