import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AddSavings } from "@/components/transactions/add-savings";

export default async function AddSavingsPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="h-dvh w-full overflow-hidden bg-[#1B2559]">
      <div className="flex h-dvh w-full justify-center overflow-hidden">
        <AddSavings />
      </div>
    </main>
  );
}