"use server";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import {
  createTransaction,
  deleteTransaction,
  type TransactionType,
} from "@/lib/transactions";

export type TransactionState = {
  error?: string;
};

export async function addTransaction(
  _prevState: TransactionState,
  formData: FormData,
): Promise<TransactionState> {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  const type = formData.get("type")?.toString() as TransactionType;

  const amountValue = formData.get("amount")?.toString().trim() ?? "";

  const date = formData.get("date")?.toString().trim() ?? "";

  const description = formData.get("description")?.toString().trim() ?? "";

  const source = formData.get("source")?.toString().trim() ?? "";

  const category = formData.get("category")?.toString().trim() ?? "";

  if (type !== "income" && type !== "expense") {
    return {
      error: "Invalid transaction type.",
    };
  }

  if (!amountValue || !date) {
    return {
      error: "Please fill in all required fields.",
    };
  }

  const amount = Number(amountValue);

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      error: "Please enter a valid amount.",
    };
  }

  if (type === "income" && !source) {
    return {
      error: "Please enter the income source.",
    };
  }

  if (type === "expense" && !category) {
    return {
      error: "Please enter the expense category.",
    };
  }

  await createTransaction({
    userId: user.id,
    type,
    amount,
    source: type === "income" ? source : undefined,
    category: type === "expense" ? category : undefined,
    date,
    description: description || undefined,
  });

  redirect("/dashboard");
}

export async function removeTransaction(transactionId: string) {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  await deleteTransaction(transactionId, user.id);
}