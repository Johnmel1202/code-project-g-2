"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/app/actions/login";
import type { LoginState } from "@/types";

const initialState: LoginState = {};

export const LoginForm = ({
  redirectTo = "/dashboard",
}: {
  redirectTo?: string;
}) => {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm px-4">
      <div className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
        <div className="relative w-20 h-20 mb-1 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="DueVo Logo"
            width={140}
            height={140}
            priority
            className="object-contain"
          />
        </div>

        <div className="mb-2">
          <h1 className="text-5xl font-bold text-[#1B2559]">DueVo</h1>
        </div>

        <form action={formAction} className="w-full space-y-3">
          <input type="hidden" name="next" value={redirectTo} />

          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded-xl bg-gray-200 text-gray-800 placeholder-gray-500 text-2xl focus:outline-none focus:ring-2 focus:ring-[#1B2559]"
            />
          </div>

          
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-200 text-gray-800 placeholder-gray-500 text-2xl focus:outline-none focus:ring-2 focus:ring-[#1B2559]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {state?.error && (
            <p className="text-base text-red-500 mt-1">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-[#1B2559] hover:bg-[#121A42] text-white font-semibold text-2xl rounded-xl transition duration-200 shadow-md disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="mt-3">
          <Link
            href="/account-recovery"
            className="text-2xl text-gray-700 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <div className="w-full mt-3">
          <Link
            href="/signup"
            className="w-full block py-2 border-2 border-[#1B2559] text-[#1B2559] font-semibold text-2xl rounded-xl hover:bg-slate-50 transition duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};