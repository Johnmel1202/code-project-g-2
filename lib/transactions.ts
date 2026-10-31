import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  source?: string;
  category?: string;
  date: string;
  description?: string;
  createdAt: string;
};

const DB_PATH = path.join(process.cwd(), "data", "transactions.json");

async function readTransactions(): Promise<Transaction[]> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as Transaction[];
  } catch {
    return [];
  }
}

async function writeTransactions(transactions: Transaction[]) {
  await fs.mkdir(path.dirname(DB_PATH), {
    recursive: true,
  });

  await fs.writeFile(DB_PATH, JSON.stringify(transactions, null, 2), "utf-8");
}

export async function createTransaction(data: {
  userId: string;
  type: TransactionType;
  amount: number;
  source?: string;
  category?: string;
  date: string;
  description?: string;
}) {
  const transactions = await readTransactions();

  const  transaction: Transaction = {
    id: `txn_${randomUUID()}`,
    userId: data.userId,
    type: data.type,
    amount: data.amount,
    source: data.source,
    category: data.category,
    date: data.date,
    description: data.description,
    createdAt: new Date().toISOString(),
  };

  transactions.push(transaction);

  await writeTransactions(transactions);

  return transaction;
}

export async function getUserTransactions(userId: string) {
  const transactions = await readTransactions();

  return transactions
    .filter((transaction) => transaction.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export async function deleteTransaction(transactionId: string, userId: string) {
  const transactions = await readTransactions();

  const updatedTransactions = transactions.filter(
    (transaction) =>
      !(transaction.id === transactionId && transaction.userId === userId),
  );

  await writeTransactions(updatedTransactions);
}

export async function getUserTransactionSummary(userId: string) {
  const transactions = await getUserTransactions(userId);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    totalBalance,
  };
}