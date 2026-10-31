"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Gift,
  Plus,
  Wallet,
  TrendingUp,
  ChevronRight,
  PiggyBank,
  ReceiptText,
} from "lucide-react";

import type { Transaction } from "@/lib/transactions";

type IncomePeriod =
  | "This Week"
  | "This Month"
  | "Last 3 Months"
  | "Last 6 Months"
  | "All Time";

type IncomeDashboardProps = {
  transactions: Transaction[];
  totalBalance?: number;
};

type ChartBucket = {
  label: string;
  amount: number;
};

const periods: IncomePeriod[] = [
  "This Week",
  "This Month",
  "Last 3 Months",
  "Last 6 Months",
  "All Time",
];

const formatMoney = (amount: number) =>
  `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getDate = (value: string) => new Date(`${value.slice(0, 10)}T00:00:00`);

const formatDate = (value: string) => {
  const date = getDate(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const startOfDay = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const startOfWeek = (date: Date) => {
  const result = startOfDay(date);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
};

const getPeriodStart = (period: IncomePeriod, now: Date) => {
  if (period === "This Week") return startOfWeek(now);

  if (period === "This Month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  if (period === "Last 3 Months") {
    return new Date(now.getFullYear(), now.getMonth() - 2, 1);
  }

  if (period === "Last 6 Months") {
    return new Date(now.getFullYear(), now.getMonth() - 5, 1);
  }

  return null;
};

const getIncomeIcon = (source: string) => {
  const value = source.toLowerCase();

  if (
    value.includes("salary") ||
    value.includes("work") ||
    value.includes("job")
  ) {
    return BriefcaseBusiness;
  }

  if (
    value.includes("allowance") ||
    value.includes("gift") ||
    value.includes("bonus")
  ) {
    return Gift;
  }

  return Wallet;
};

const getIncomeColors = (source: string) => {
  const value = source.toLowerCase();

  if (
    value.includes("salary") ||
    value.includes("work") ||
    value.includes("job")
  ) {
    return "bg-[#B9F1C4] text-[#17684F]";
  }

  if (
    value.includes("allowance") ||
    value.includes("gift") ||
    value.includes("bonus")
  ) {
    return "bg-[#C9DFFF] text-[#2468B5]";
  }

  return "bg-[#E4DDFB] text-[#6744B7]";
};

const getChartBuckets = (
  transactions: Transaction[],
  period: IncomePeriod,
  now: Date,
): ChartBucket[] => {
  const sumForRange = (start: Date, end: Date) =>
    transactions.reduce((total, transaction) => {
      const date = getDate(transaction.date);

      return !Number.isNaN(date.getTime()) && date >= start && date < end
        ? total + transaction.amount
        : total;
    }, 0);

  if (period === "This Week") {
    const monday = startOfWeek(now);

    return Array.from({ length: 7 }, (_, index) => {
      const start = new Date(monday);
      start.setDate(monday.getDate() + index);

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      return {
        label: start.toLocaleDateString("en-PH", {
          weekday: "short",
        }),
        amount: sumForRange(start, end),
      };
    });
  }

  if (period === "This Month") {
    const weekCount = Math.ceil(now.getDate() / 7);

    return Array.from({ length: weekCount }, (_, index) => {
      const start = new Date(now.getFullYear(), now.getMonth(), index * 7 + 1);

      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        (index + 1) * 7 + 1,
      );

      return {
        label: `W${index + 1}`,
        amount: sumForRange(start, end),
      };
    });
  }

  let firstMonth: Date;

  if (period === "Last 3 Months") {
    firstMonth = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  } else if (period === "Last 6 Months") {
    firstMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  } else {
    firstMonth =
      transactions.reduce<Date | null>((earliest, transaction) => {
        const date = getDate(transaction.date);

        if (Number.isNaN(date.getTime())) return earliest;

        const month = new Date(date.getFullYear(), date.getMonth(), 1);

        return !earliest || month < earliest ? month : earliest;
      }, null) ?? new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthCount =
    (currentMonth.getFullYear() - firstMonth.getFullYear()) * 12 +
    currentMonth.getMonth() -
    firstMonth.getMonth() +
    1;

  return Array.from({ length: Math.max(monthCount, 1) }, (_, index) => {
    const start = new Date(
      firstMonth.getFullYear(),
      firstMonth.getMonth() + index,
      1,
    );

    const end = new Date(
      firstMonth.getFullYear(),
      firstMonth.getMonth() + index + 1,
      1,
    );

    return {
      label: start.toLocaleDateString("en-PH", {
        month: "short",
      }),
      amount: sumForRange(start, end),
    };
  });
};

export function IncomeDashboard({
  transactions,
  totalBalance = 0,
}: IncomeDashboardProps) {
  const [period, setPeriod] = useState<IncomePeriod>("This Month");

  const now = new Date();
  const todayKey = now.toDateString();

  const incomeTransactions = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "income")
        .sort((a, b) => getDate(b.date).getTime() - getDate(a.date).getTime()),
    [transactions],
  );

  const filteredIncome = useMemo(() => {
    const start = getPeriodStart(period, now);
    const today = startOfDay(now);

    return incomeTransactions.filter((transaction) => {
      const date = getDate(transaction.date);

      return (
        !Number.isNaN(date.getTime()) &&
        date <= today &&
        (!start || date >= start)
      );
    });
  }, [incomeTransactions, period, todayKey]);

  const totalIncome = filteredIncome.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const chartBuckets = useMemo(
    () => getChartBuckets(filteredIncome, period, now),
    [filteredIncome, period, todayKey],
  );

  const maximum = Math.max(...chartBuckets.map((bucket) => bucket.amount), 1);

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#E5EBF7] text-[#101653]">
      {/* HEADER - MATCHES MAIN DASHBOARD */}
      <header className="w-full shrink-0 bg-[#315B8A] px-4 pb-4 pt-4 text-white sm:px-6 sm:pb-5 sm:pt-5 lg:px-10 lg:pb-6 lg:pt-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/15 sm:h-12 sm:w-12"
          >
            <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </Link>

          <h1 className="text-4xl font-bold leading-none text-white sm:text-5xl lg:text-6xl">
            DueVo
          </h1>
        </div>

        {/* TOTAL BALANCE */}
        <section className="mt-4 rounded-2xl bg-[#17175F] px-4 py-4 sm:mt-5 sm:px-6 sm:py-5 lg:mt-6 lg:px-7">
          <p className="text-base leading-none sm:text-lg lg:text-xl">
            Total Balance
          </p>

          <p className="mt-2 break-words text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {formatMoney(totalBalance)}
          </p>
        </section>

        {/* FINANCE NAVIGATION */}
        <nav
          aria-label="Finance sections"
          className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3"
        >
          <Link
            href="/income"
            aria-current="page"
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#36ADA3] px-2 text-center text-base font-bold text-white transition hover:bg-[#258F87] sm:min-h-12 sm:rounded-2xl sm:text-lg"
          >
            <Wallet className="hidden h-4 w-4 sm:block" />
            Income
          </Link>

          <Link
            href="/expenses"
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#17175F] px-2 text-center text-base text-white transition hover:bg-[#282878] sm:min-h-12 sm:rounded-2xl sm:text-lg"
          >
            <ReceiptText className="hidden h-4 w-4 sm:block" />
            Expenses
          </Link>

          <Link
            href="/savings"
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#17175F] px-2 text-center text-base text-white transition hover:bg-[#282878] sm:min-h-12 sm:rounded-2xl sm:text-lg"
          >
            <PiggyBank className="hidden h-4 w-4 sm:block" />
            Savings
          </Link>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex w-full flex-1 flex-col gap-4 px-3 pb-8 pt-4 sm:gap-5 sm:px-5 sm:pb-10 sm:pt-5 lg:gap-6 lg:px-8 lg:pb-12 lg:pt-6">
        {/* PERIOD FILTERS */}
        <section
          aria-label="Income time period"
          className="flex w-full gap-2 overflow-x-auto pb-1"
        >
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              aria-pressed={period === item}
              className={`btn h-10 min-h-10 shrink-0 rounded-full border-0 px-4 text-sm normal-case shadow-none transition sm:h-11 sm:min-h-11 sm:px-5 sm:text-base ${
                period === item
                  ? "bg-[#17684F] text-white hover:bg-[#125640]"
                  : "bg-white text-[#526078] hover:bg-[#D5E8E5] hover:text-[#101653]"
              }`}
            >
              {item}
            </button>
          ))}
        </section>

        {/* INCOME OVERVIEW + SOURCES */}
        <div className="grid w-full grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {/* INCOME OVERVIEW */}
          <section className="card min-w-0 rounded-2xl border border-white/70 bg-white shadow-sm">
            <div className="card-body min-w-0 gap-4 p-4 sm:p-5 lg:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                    Income Overview
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Income received during {period.toLowerCase()}
                  </p>
                </div>

                <p className="break-words text-xl font-bold text-[#17684F] sm:text-2xl">
                  {formatMoney(totalIncome)}
                </p>
              </div>

              {filteredIncome.length === 0 ? (
                <div className="flex min-h-44 flex-col items-center justify-center rounded-xl bg-[#F0F8F5] px-4 text-center sm:min-h-52">
                  <TrendingUp className="h-9 w-9 text-[#36ADA3]" />

                  <p className="mt-2 text-lg text-gray-500">
                    No income for {period.toLowerCase()}.
                  </p>
                </div>
              ) : (
                <div className="min-w-0 rounded-xl bg-[#F0F8F5] px-2 pb-3 pt-4 sm:px-4 sm:pt-5">
                  <div className="flex h-48 w-full gap-2 sm:h-60 sm:gap-3">
                    <div className="flex w-8 shrink-0 flex-col justify-between pb-7 text-right text-xs text-[#526078] sm:w-10 sm:text-sm">
                      {[1, 0.75, 0.5, 0.25, 0].map((ratio) => (
                        <span key={ratio}>
                          {Math.round(maximum * ratio).toLocaleString("en-PH", {
                            notation: "compact",
                            maximumFractionDigits: 1,
                          })}
                        </span>
                      ))}
                    </div>

                    <div className="relative flex min-w-0 flex-1 items-end gap-1 border-b border-l border-[#CBDDD7] px-1 sm:gap-3 sm:px-2">
                      <div className="pointer-events-none absolute inset-0 mb-7 flex flex-col justify-between">
                        {[0, 1, 2, 3].map((line) => (
                          <div
                            key={line}
                            className="border-t border-dashed border-[#D9E8E2]"
                          />
                        ))}
                      </div>

                      {chartBuckets.map((bucket, index) => (
                        <div
                          key={`${bucket.label}-${index}`}
                          className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                          title={`${bucket.label}: ${formatMoney(bucket.amount)}`}
                        >
                          <div className="flex w-full flex-1 items-end justify-center">
                            <div
                              className="w-full max-w-12 rounded-t-md bg-[#36ADA3] transition-all hover:bg-[#17684F]"
                              style={{
                                height:
                                  bucket.amount > 0
                                    ? `${Math.max((bucket.amount / maximum) * 100, 3)}%`
                                    : "0%",
                              }}
                            />
                          </div>

                          <span className="mt-2 h-5 max-w-full truncate text-center text-[10px] text-[#526078] sm:text-sm">
                            {bucket.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* INCOME SOURCES */}
          <section className="card min-w-0 rounded-2xl border border-white/70 bg-white shadow-sm">
            <div className="card-body min-w-0 gap-3 p-4 sm:p-5 lg:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                  Income Sources
                </h2>

                <span className="badge border-0 bg-[#DDF3E8] px-3 py-3 text-[#17684F]">
                  {filteredIncome.length}{" "}
                  {filteredIncome.length === 1 ? "record" : "records"}
                </span>
              </div>

              {filteredIncome.length === 0 ? (
                <p className="py-8 text-center text-lg text-gray-400">
                  No income sources to display.
                </p>
              ) : (
                <div className="max-h-[420px] space-y-2 overflow-y-auto overscroll-contain pr-1">
                  {filteredIncome.map((transaction) => {
                    const source = transaction.source?.trim() || "Other Income";

                    const Icon = getIncomeIcon(source);
                    const colors = getIncomeColors(source);

                    return (
                      <div
                        key={transaction.id}
                        className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#E8EDF3] bg-[#FCFDFE] p-3 transition hover:border-[#B9E7D9] hover:bg-[#F4FBF8] sm:gap-4 sm:p-4"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${colors}`}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-lg font-semibold leading-tight sm:text-xl">
                            {source}
                          </p>

                          <p className="mt-1 truncate text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </p>

                          {transaction.description && (
                            <p className="mt-1 truncate text-sm text-gray-400">
                              {transaction.description}
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-[#17684F] sm:text-lg">
                            {formatMoney(transaction.amount)}
                          </p>
                        </div>

                        <ChevronRight className="hidden h-5 w-5 shrink-0 text-gray-400 sm:block" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ADD INCOME */}
        <Link
          href="/add-income"
          className="btn min-h-12 w-full rounded-2xl border-0 bg-[#17684F] text-lg font-semibold normal-case text-white shadow-sm transition hover:bg-[#125640] active:scale-[0.99] sm:min-h-14 sm:text-xl"
        >
          <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
          Add Income
        </Link>
      </main>
    </div>
  );
}