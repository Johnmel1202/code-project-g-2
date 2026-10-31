"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { handleAccountRecovery } from "@/app/actions/recovery";
import type { LoginState } from "@/types";

const initialState: LoginState = {};

export const RecoveryForm = () => {
  const [state, formAction, isPending] = useActionState(
    handleAccountRecovery,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm px-4">
      <div className="bg-[#0E1342] text-white rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
      
        <h1 className="text-5xl font-normal mt-2 mb-4 leading-none">
          Account Recovery
        </h1>

        <form action={formAction} className="w-full space-y-3">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              required
              className="w-full px-4 py-1 rounded-xl bg-[#D9D9D9] text-gray-900 placeholder-gray-600 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            />
          </div>

          <p className="text-xl text-gray-200 px-2 leading-none">
            Enter the last password you remember using this account
          </p>

          
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-1 pr-10 rounded-xl bg-[#D9D9D9] text-gray-900 placeholder-gray-600 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {state?.error && (
            <p className="text-xl text-red-400 mt-1 leading-none">
              {state.error}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 pb-2">
            <Link
              href="/forgot-password/options"
              className="text-xl text-gray-200 hover:underline font-medium leading-none"
            >
              Try another way
            </Link>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-1 bg-[#D9D9D9] hover:bg-white text-gray-900 font-semibold text-2xl rounded-xl transition duration-200 shadow disabled:opacity-50 leading-none"
            >
              {isPending ? "Submitting..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};