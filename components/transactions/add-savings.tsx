
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Settings, PiggyBank } from "lucide-react";

export const AddSavings = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#E3EDF7] sm:p-4 lg:p-8">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col overflow-hidden bg-[#17175F] text-white shadow-2xl sm:min-h-[calc(100vh-2rem)] sm:rounded-2xl lg:min-h-[calc(100vh-4rem)]">
        {/* HEADER */}
        <header className="px-4 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7 lg:px-12">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go Back"
              className="rounded-full p-2 transition hover:bg-white/10 active:scale-95"
            >
              <ArrowLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            <button
              type="button"
              onClick={() => alert("Settings screen is not available yet.")}
              aria-label="Settings"
              className="rounded-full p-2 transition hover:bg-white/10 active:scale-95"
            >
              <Settings className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          </div>

          <h1 className="mt-4 text-center text-3xl font-bold leading-tight sm:mt-5 sm:text-4xl lg:text-5xl">
            Add Savings
          </h1>

          <div className="mt-4 flex justify-center sm:mt-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-black sm:h-24 sm:w-24 lg:h-28 lg:w-28">
              <PiggyBank className="h-12 w-12 stroke-[1.7] sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
            </div>
          </div>
        </header>

        {/* FORM SECTION */}
        <section className="flex-1 rounded-t-[22px] bg-white px-4 pb-8 pt-6 text-black sm:rounded-t-[28px] sm:px-8 sm:pb-10 sm:pt-8 lg:px-12">
          <form
            className="mx-auto w-full max-w-2xl space-y-5 sm:space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              alert(
                "Savings form is ready. Saving functionality will be connected next.",
              );
            }}
          >
            {/* AMOUNT */}
            <div>
              <label
                htmlFor="savings-amount"
                className="mb-2 block text-base font-semibold sm:text-lg"
              >
                Amount
              </label>

              <input
                id="savings-amount"
                name="amount"
                type="number"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                required
                className="h-12 w-full min-w-0 rounded-lg border border-transparent bg-[#DCE8F3] px-3 text-base outline-none transition focus:border-[#35AAA5] focus:ring-2 focus:ring-[#35AAA5]/20 sm:h-14 sm:px-4 sm:text-lg"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label
                htmlFor="savings-category"
                className="mb-2 block text-base font-semibold sm:text-lg"
              >
                Category
              </label>

              <select
                id="savings-category"
                name="category"
                required
                defaultValue=""
                className="h-12 w-full min-w-0 rounded-lg border border-transparent bg-[#DCE8F3] px-3 text-base outline-none transition focus:border-[#35AAA5] focus:ring-2 focus:ring-[#35AAA5]/20 sm:h-14 sm:px-4 sm:text-lg"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Emergency Fund">Emergency Fund</option>
                <option value="Education">Education</option>
                <option value="Gadget">Gadget</option>
                <option value="Travel">Travel</option>
                <option value="Personal Goal">Personal Goal</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <label
                htmlFor="savings-date"
                className="mb-2 block text-base font-semibold sm:text-lg"
              >
                Date
              </label>

              <input
                id="savings-date"
                name="date"
                type="date"
                required
                className="h-12 w-full min-w-0 rounded-lg border border-transparent bg-[#DCE8F3] px-3 text-base outline-none transition focus:border-[#35AAA5] focus:ring-2 focus:ring-[#35AAA5]/20 sm:h-14 sm:px-4 sm:text-lg"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                htmlFor="savings-description"
                className="mb-2 block text-base font-semibold sm:text-lg"
              >
                Description <span className="font-normal text-gray-500">(Optional)</span>
              </label>

              <input
                id="savings-description"
                name="description"
                type="text"
                placeholder="Describe your savings goal..."
                className="h-12 w-full min-w-0 rounded-lg border border-transparent bg-[#DCE8F3] px-3 text-base outline-none transition placeholder:text-sm focus:border-[#35AAA5] focus:ring-2 focus:ring-[#35AAA5]/20 sm:h-14 sm:px-4 sm:text-lg sm:placeholder:text-base"
              />
            </div>

            {/* ADD BUTTON */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                className="h-12 w-full rounded-lg border border-[#1B2559] bg-[#3AAFA9] px-4 text-base font-semibold text-black transition hover:bg-[#329F9A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17175F] focus-visible:ring-offset-2 active:scale-[0.99] sm:h-14 sm:text-lg"
              >
                Add Savings
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
