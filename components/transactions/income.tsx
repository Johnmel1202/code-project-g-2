"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  Gift,
  Plus,
  ChevronRight,
} from "lucide-react";

export function IncomeComponent() {
  const router = useRouter();

  const incomeSources = [
    {
      id: "1",
      title: "Salary",
      date: "May 10, 2025",
      amount: "₱7,000.00",
      icon: Briefcase,
      iconBg: "bg-[#E6F4EA] text-[#137333]",
      amountColor: "text-[#137333]",
    },
    {
      id: "2",
      title: "Allowance",
      date: "May 15, 2025",
      amount: "₱2,000.00",
      icon: Gift,
      iconBg: "bg-[#E8F0FE] text-[#1A73E8]",
      amountColor: "text-[#137333]",
    },
    {
      id: "3",
      title: "Other Income",
      date: "May 20, 2025",
      amount: "₱1,000.00",
      icon: Plus,
      iconBg: "bg-[#F1F3F4] text-[#5F6368]",
      amountColor: "text-[#137333]",
    },
  ];

  return (
    <div className="mx-auto flex h-screen w-full max-w-sm flex-col overflow-hidden bg-[#0C1E3A] text-slate-800">
      {/* HEADER SECTION */}
      <header className="shrink-0 bg-[#0C1E3A] px-4 pt-4 pb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Back"
              className="rounded-full p-1 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6 stroke-[2.5]" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-[#FF8A00]">
              DueVo
            </h1>
          </div>

          <button
            type="button"
            aria-label="Calendar"
            className="rounded-full p-1 transition hover:bg-white/10"
          >
            <Calendar className="h-6 w-6" />
          </button>
        </div>

        {/* TOTAL INCOME SUMMARY */}
        <div className="mt-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6F6D5] text-[#137333]">
              <svg
                aria-hidden="true"
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
            </div>

            <div>
              <p className="text-base font-semibold text-slate-200">
                Total Income
              </p>
              <p className="text-xs text-slate-400">All money received</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                ₱10,000.00
              </p>
            </div>
          </div>

          {/* GRAPH ICON */}
          <div className="flex items-end gap-1 opacity-80">
            <div className="h-4 w-2 rounded-t bg-[#107C41]"></div>
            <div className="h-6 w-2 rounded-t bg-[#107C41]"></div>
            <div className="h-8 w-2 rounded-t bg-[#107C41]"></div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="min-h-0 flex-1 space-y-4 overflow-y-auto rounded-t-3xl bg-white px-4 pt-5 pb-6">
        {/* TIME PERIOD FILTERS */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 text-xs font-semibold">
          <button className="rounded-xl bg-[#0F5233] px-3 py-2 text-white shadow-sm">
            This Month
          </button>
          <button className="rounded-xl bg-slate-100 px-3 py-2 text-slate-500 hover:bg-slate-200">
            Last 3 Months
          </button>
          <button className="rounded-xl bg-slate-100 px-3 py-2 text-slate-500 hover:bg-slate-200">
            Last 6 Months
          </button>
          <button className="rounded-xl bg-slate-100 px-3 py-2 text-slate-500 hover:bg-slate-200">
            All Time
          </button>
        </div>

        {/* INCOME OVERVIEW BAR CHART */}
        <div className="rounded-2xl bg-[#F4FBF7] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Income Overview
            </h2>
            <span className="text-sm font-bold text-[#0F5233]">
              ₱10,000.00
            </span>
          </div>

          <div className="mt-4 flex h-32 items-end justify-between border-b border-slate-200 pb-2 px-2 text-[10px] text-slate-500">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-6 rounded-t bg-[#2E7D32]"
                style={{ height: "45px" }}
              />
              <span>Jan</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-6 rounded-t bg-[#2E7D32]"
                style={{ height: "65px" }}
              />
              <span>Feb</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-6 rounded-t bg-[#2E7D32]"
                style={{ height: "52px" }}
              />
              <span>Mar</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-6 rounded-t bg-[#2E7D32]"
                style={{ height: "35px" }}
              />
              <span>Apr</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-6 rounded-t bg-[#2E7D32]"
                style={{ height: "75px" }}
              />
              <span>May</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-6 rounded-t bg-[#2E7D32]"
                style={{ height: "50px" }}
              />
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* INCOME SOURCES LIST */}
        <div>
          <h2 className="text-sm font-bold text-slate-800">Income Sources</h2>

          <div className="mt-3 space-y-3">
            {incomeSources.map((source) => {
              const Icon = source.icon;
              return (
                <div
                  key={source.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${source.iconBg}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {source.title}
                      </p>
                      <p className="text-xs text-slate-400">{source.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm font-bold ${source.amountColor}`}
                    >
                      {source.amount}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ADD INCOME BUTTON */}
        <div className="pt-2">
          <Link
            href="/add-income"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F5233] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0B3D26] active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Add Income
          </Link>
        </div>
      </main>
    </div>
  );
}