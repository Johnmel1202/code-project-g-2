import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AddExpense } from "@/components/transactions/add-expense";

export default async function AddExpensePage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-[#1B2559]">
      <div className="h-screen w-full flex justify-center overflow-hidden">
        <AddExpense />
      </div>
    </main>
  );
}