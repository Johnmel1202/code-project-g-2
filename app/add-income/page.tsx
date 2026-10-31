import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AddIncome } from "@/components/transactions/add-income";

export default async function AddIncomePage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-[#1B2559]">
      <div className="h-screen w-full flex justify-center overflow-hidden">
        <AddIncome />
      </div>
    </main>
  );
}