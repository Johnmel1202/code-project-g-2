"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Home,
  FileText,
  Plus,
  Wallet,
  CircleUser,
  Settings,
  PiggyBank,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Utensils,
  Bus,
  ReceiptText,
  GraduationCap,
  ShoppingBag,
} from "lucide-react";

import type { SessionUser } from "@/types";
import type { Transaction } from "@/lib/transactions";

type DashboardSummary = {
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
};

type DashboardScreenProps = {
  user: SessionUser;
  transactions: Transaction[];
  summary: DashboardSummary;
  activeTab: "home" | "income" | "expenses";
};

type SpendingPeriod = "Today" | "This Week" | "This Month" | "This Year";

const periods: SpendingPeriod[] = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
];

const chartColors = [
  "#FF3636",
  "#FF8A22",
  "#36ADA3",
  "#168BFF",
  "#8B5CF6",
  "#9CA3AF",
];

const formatMoney = (amount: number) =>
  `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getDate = (value: string) => {
  const dateOnly = value.slice(0, 10);
  return new Date(`${dateOnly}T00:00:00`)
};

const formatDate = (value: string) =>
  getDate(value).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getCategoryIcon = (category: string) => {
  const value = category.toLowerCase();

  if (value.includes("food") || value.includes("restaurant")) {
    return Utensils;
  }

  if (value.includes("transport") || value.includes("commute")) {
    return Bus;
  }

  if (value.includes("school") || value.includes("education")) {
    return GraduationCap;
  }

  if (value.includes("shop") || value.includes("shopping")) {
    return ShoppingBag;
  }

  return ReceiptText;
};

const matchesPeriod = (value: string, period: SpendingPeriod, now: Date) => {
  const date = getDate(value);

  if (Number.isNaN(date.getTime())) return false;

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  if (period === "Today") {
    return date.getTime() === today.getTime();
  }

  if (period === "This Week") {
    const startOfWeek = new Date(today);
    const day = (startOfWeek.getDay() + 6) % 7;

    startOfWeek.setDate(startOfWeek.getDate() - day);

    return date >= startOfWeek && date <= today;
  }

  if (period === "This Month") {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date <= today
    );
  }

  return date.getFullYear() === today.getFullYear() && date <= today;
};

export const DashboardScreen = ({
  user,
  transactions,
  summary,
}: DashboardScreenProps) => {
  const [period, setPeriod] = useState<SpendingPeriod>("This Month");
  const [periodOpen, setPeriodOpen] = useState(false);

  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const periodExpenses = useMemo(() => {
    const now = new Date();

    return expenses.filter((transaction) =>
      matchesPeriod(transaction.date, period, now),
    );
  }, [transactions, period]);

  const categoryTotals = periodExpenses.reduce<Record<string, number>>(
    (result, transaction) => {
      const category = transaction.category?.trim() || "Other";

      result[category] = (result[category] || 0) + transaction.amount;

      return result;
    },
    {},
  );

  const categories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const periodExpenseTotal = periodExpenses.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const recentTransactions = [...transactions]
    .sort((a, b) => getDate(b.date).getTime() - getDate(a.date).getTime())
    .slice(0, 10);

  const billCount = expenses.filter((transaction) =>
    (transaction.category || "").toLowerCase().includes("bill"),
  ).length;

  // Temporary estimate until a saved budget limit is available.
  const budgetProgress =
    summary.totalIncome > 0
      ? Math.min(
          100,
          Math.round((summary.totalExpense / summary.totalIncome) * 100),
        )
      : 0;

  let runningPercentage = 0;

  const spendingGradient =
    periodExpenseTotal > 0
      ? categories
          .map(([, amount], index) => {
            const start = runningPercentage;

            runningPercentage += (amount / periodExpenseTotal) * 100;

            return `${chartColors[index % chartColors.length]} ${start}% ${runningPercentage}%`;
          })
          .join(", ")
      : "#E5E7EB 0% 100%";

  return (
    <div className="relative flex h-dvh min-h-[600px] w-full flex-col overflow-hidden bg-[#E5EBF7] text-[#101653]">
      {/* HEADER */}
      <header className="shrink-0 bg-[#315B8A] px-4 pb-4 pt-4 text-white sm:px-6 lg:px-10 lg:pb-5 lg:pt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">
              DueVo
            </h1>

            <p className="mt-1 truncate text-xl leading-none sm:text-2xl lg:text-3xl">
              Hello, {user.name || "User"}!
            </p>
          </div>

          <Link
            href="/settings"
            aria-label="Settings"
            className="shrink-0 rounded-full p-2 transition hover:bg-white/10"
          >
            <Settings className="h-6 w-6 sm:h-7 sm:w-7" />
          </Link>
        </div>

        <div className="mt-3 rounded-2xl bg-[#17175F] px-4 py-3 sm:px-5 lg:mt-4 lg:px-7 lg:py-4">
          <p className="text-base leading-none sm:text-lg lg:text-xl">
            Total Balance
          </p>

          <p className="mt-1 break-words text-3xl leading-none sm:text-4xl lg:text-5xl">
            {formatMoney(summary.totalBalance)}
          </p>
        </div>
      </header>

      {/* SUMMARY CARDS */}
      <section className="grid shrink-0 grid-cols-2 gap-3 bg-[#E5EBF7] px-3 py-3 sm:px-5 lg:grid-cols-4 lg:gap-4 lg:px-8 lg:py-5">
        {/* TOTAL INCOME */}
        <Link
          href="/income"
          className="min-w-0 rounded-2xl bg-white p-3 shadow-sm transition hover:bg-[#36ADA3] hover:text-white sm:p-4 lg:p-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B9F1C4] text-green-800 sm:h-11 sm:w-11">
              <PiggyBank className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm leading-tight sm:text-base">Total Income</p>

              <p className="mt-1 break-words text-base font-bold leading-tight sm:text-xl lg:text-2xl">
                {formatMoney(summary.totalIncome)}
              </p>
            </div>
          </div>
        </Link>

        {/* TOTAL EXPENSES */}
        <Link
          href="/expenses"
          className="min-w-0 rounded-2xl bg-white p-3 shadow-sm transition hover:bg-[#36ADA3] hover:text-white sm:p-4 lg:p-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFC9C9] text-red-700 sm:h-11 sm:w-11">
              <ReceiptText className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm leading-tight sm:text-base">
                Total Expenses
              </p>

              <p className="mt-1 break-words text-base font-bold leading-tight sm:text-xl lg:text-2xl">
                {formatMoney(summary.totalExpense)}
              </p>
            </div>
          </div>
        </Link>

        {/* UPCOMING BILLS */}
        <Link
          href="/upcoming-bills"
          className="min-w-0 rounded-2xl bg-white p-3 shadow-sm transition hover:bg-[#36ADA3] hover:text-white sm:p-4 lg:p-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C9DFFF] text-blue-800 sm:h-11 sm:w-11">
              <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm leading-tight sm:text-base">
                Upcoming Bills
              </p>

              <p className="mt-1 text-base font-bold leading-tight sm:text-xl lg:text-2xl">
                {billCount} {billCount === 1 ? "Item" : "Items"}
              </p>
            </div>
          </div>
        </Link>

        {/* BUDGET PROGRESS */}
        <Link
          href="/budget"
          className="min-w-0 rounded-2xl bg-white p-3 shadow-sm transition hover:bg-[#36ADA3] hover:text-white sm:p-4 lg:p-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE0C2] text-orange-700 sm:h-11 sm:w-11">
              <ChartNoAxesColumnIncreasing className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm leading-tight sm:text-base">
                Budget Progress
              </p>

              <p className="mt-1 text-base font-bold leading-tight sm:text-xl lg:text-2xl">
                {budgetProgress}%
              </p>
            </div>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-300">
            <div
              className="h-full rounded-full bg-[#F07800] transition-all"
              style={{ width: `${budgetProgress}%` }}
            />
          </div>
        </Link>
      </section>

      {/* MAIN CONTENT */}
      <main className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 pb-28 pt-1 sm:space-y-4 sm:px-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5 lg:space-y-0 lg:px-8 lg:pb-32 lg:pt-3">
        {/* SPENDING OVERVIEW */}
        <section className="min-w-0 rounded-2xl bg-white p-3.5 shadow-sm sm:p-5 lg:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
                Spending Overview
              </h2>

              <p className="mt-1 text-sm leading-tight text-gray-500 sm:text-base">
                Expense categories
              </p>
            </div>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setPeriodOpen((open) => !open)}
                aria-expanded={periodOpen}
                className="flex items-center gap-1 rounded-full bg-[#E5EBF7] px-3 py-1.5 text-sm transition hover:bg-[#36ADA3] hover:text-white sm:text-base"
              >
                {period}
                <span aria-hidden="true">⌄</span>
              </button>

              {periodOpen && (
                <div className="absolute right-0 top-full z-20 mt-1 min-w-32 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                  {periods.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setPeriod(item);
                        setPeriodOpen(false);
                      }}
                      className={`block w-full px-3 py-2 text-left text-base transition hover:bg-[#36ADA3] hover:text-white ${
                        period === item
                          ? "bg-[#36ADA3] text-white"
                          : "text-[#101653]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {categories.length === 0 ? (
            <p className="py-6 text-center text-lg text-gray-400">
              No expenses for {period.toLowerCase()}.
            </p>
          ) : (
            <div className="mt-4 flex items-center gap-3 sm:gap-5 lg:gap-6">
              {/* DONUT CHART */}
              <div
                className="relative h-24 w-24 shrink-0 rounded-full sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                style={{
                   background: `conic-gradient(${spendingGradient})`,
                }}
                aria-label={`Spending breakdown for ${period}`}
              >
                <div className="absolute inset-4 flex items-center justify-center rounded-full bg-white sm:inset-5 lg:inset-6">
                  <span className="break-words px-1 text-center text-[10px] leading-tight sm:text-xs lg:text-sm">
                    {formatMoney(periodExpenseTotal)}
                    <br />
                    Expenses
                  </span>
                </div>
              </div>

              {/* CATEGORY LIST */}
              <div className="max-h-40 min-w-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1 sm:max-h-52">
                {categories.map(([category, amount], index) => {
                  const percentage =
                    periodExpenseTotal > 0
                      ? (amount / periodExpenseTotal) * 100
                      : 0;

                  return (
                    <div key={category} className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              chartColors[index % chartColors.length],
                          }}
                        />

                        <span className="min-w-0 flex-1 truncate text-sm leading-tight sm:text-base">
                          {category}
                        </span>

                        <span className="shrink-0 text-xs leading-tight sm:text-sm">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>

                      <p className="mt-1 pl-4 text-sm leading-tight text-gray-500 sm:text-base">
                        {formatMoney(amount)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* RECENT TRANSACTIONS */}
        <section className="min-w-0 rounded-2xl bg-white p-3.5 shadow-sm sm:p-5 lg:p-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
              Recent Transaction
            </h2>

            <Link
              href="/transactions"
              className="shrink-0 rounded-full bg-[#E5EBF7] px-3 py-1 text-sm transition hover:bg-[#36ADA3] hover:text-white sm:text-base"
            >
              View All
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <p className="py-6 text-center text-lg text-gray-400">
              No transactions yet.
            </p>
          ) : (
            <div className="mt-4 max-h-64 space-y-4 overflow-y-auto overscroll-contain pr-1 sm:max-h-80">
              {recentTransactions.map((transaction) => {
                const isIncome = transaction.type === "income";

                const title = isIncome
                  ? transaction.source || "Income"
                  : transaction.category || "Expense";

                const Icon = isIncome ? PiggyBank : getCategoryIcon(title);

                return (
                  <div
                    key={transaction.id}
                    className="flex min-w-0 items-center gap-2 sm:gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E5EBF7] sm:h-10 sm:w-10">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium leading-tight sm:text-lg">
                        {title}
                      </p>

                      <p className="mt-1 text-sm leading-tight text-gray-500 sm:text-base">
                        {formatDate(transaction.date)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 text-sm leading-tight sm:text-base ${
                        isIncome ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatMoney(transaction.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* RESPONSIVE BOTTOM NAVIGATION */}

      <nav className="fixed inset-x-0 bottom-0 z-30 flex w-full items-center justify-around border-t border-gray-200 bg-white px-2 py-2 text-gray-700 sm:px-6 sm:py-3 lg:px-16">
        <Link
          href="/home"
          className="flex min-w-0 flex-col items-center gap-1 text-[#36ADA3] transition hover:text-[#36ADA3]"
        >
          <Home className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          <span className="text-xs leading-none sm:text-sm lg:text-base">
            Home
          </span>
        </Link>

        <Link
          href="/transactions"
          className="flex min-w-0 flex-col items-center gap-1 transition hover:text-[#36ADA3]"
        >
          <FileText className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          <span className="text-xs leading-none sm:text-sm lg:text-base">
            Transaction
          </span>
        </Link>

        <Link
          href="/add-transaction"
          aria-label="Add transaction"
          className="-mt-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#17175F] bg-white text-[#17175F] shadow-lg transition hover:bg-[#36ADA3] hover:text-white active:scale-90 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
        >
          <Plus className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
        </Link>

        <Link
          href="/budget"
          className="flex min-w-0 flex-col items-center gap-1 transition hover:text-[#36ADA3]"
        >
          <Wallet className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          <span className="text-xs leading-none sm:text-sm lg:text-base">
            Budget
          </span>
        </Link>

        <Link
          href="/profile"
          className="flex min-w-0 flex-col items-center gap-1 transition hover:text-[#36ADA3]"
        >
          <CircleUser className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          <span className="text-xs leading-none sm:text-sm lg:text-base">
            Profile
          </span>
        </Link>
      </nav>
    </div>
  );
};