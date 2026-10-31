"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { register } from "@/app/actions/register";
import type { LoginState } from "@/types";

const initialState: LoginState = {};

export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(register, initialState);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [clientError, setClientError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setClientError("");

    const form = e.currentTarget;

    const fullName = (
      form.elements.namedItem("fullName") as HTMLInputElement
    ).value.trim();

    const emailOrMobile = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();

    
    const fullNamePattern = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!fullNamePattern.test(fullName)) {
      e.preventDefault();
      setClientError("Full Name should contain letters and spaces only.");
      return;
    }

    if (fullName.length < 2) {
      e.preventDefault();
      setClientError("Full Name must be at least 2 characters.");
      return;
    }

    
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    

    if (password.length < 8) {
      e.preventDefault();
      setClientError("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      e.preventDefault();
      setClientError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      e.preventDefault();
      setClientError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      e.preventDefault();
      setClientError("Password must contain at least one number.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      e.preventDefault();
      setClientError("Password must contain at least one special character.");
      return;
    }


    if (password !== confirmPassword) {
      e.preventDefault();
      setClientError("Passwords do not match.");
      return;
    }
  };

  return (
    <div className="w-full max-w-sm px-4">
      <div className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
        <div className="relative w-20 h-16 mb-2 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="DueVo Logo"
            width={120}
            height={60}
            priority
            className="object-contain"
          />
        </div>

        <div className="mb-4">
          <h1 className="text-5xl font-bold text-[#1B2559] leading-none">
            Signup
          </h1>
        </div>

        <form
          action={formAction}
          onSubmit={handleSubmit}
          className="w-full space-y-3"
        >
          {/* FULL NAME */}
          <div className="text-left">
            <label
              htmlFor="fullName"
              className="block  ml-1 text-xl font-semibold text-[#1B2559] leading-none"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              required
              minLength={2}
              maxLength={50}
              className="w-full px-4 py-1 rounded-xl bg-gray-200 text-gray-800 placeholder-gray-500 text-2xl focus:outline-none focus:ring-2 focus:ring-[#1B2559]"
            />
          </div>

          {/* EMAIL  */}
          <div className="text-left">
            <label
              htmlFor="email"
              className="block  ml-1 text-xl font-semibold text-[#1B2559] leading-none"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              required
              maxLength={50}
              className="w-full px-4 py-1 rounded-xl bg-gray-200 text-gray-800 placeholder-gray-500 text-2xl focus:outline-none focus:ring-2 focus:ring-[#1B2559]"
            />
          </div>

          {/* PASSWORD */}
          <div className="text-left">
            <label
              htmlFor="password"
              className="block  ml-1 text-xl font-semibold text-[#1B2559] leading-none"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="8+ chars: Aa, 123, !@#"
                required
                minLength={8}
                maxLength={64}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-1 pr-10 rounded-xl bg-gray-200 text-gray-800 placeholder-gray-500 placeholder:text-base text-2xl focus:outline-none focus:ring-2 focus:ring-[#1B2559]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          
          <div className="text-left">
            <label
              htmlFor="confirmPassword"
              className="block  ml-1 text-xl font-semibold text-[#1B2559] leading-none"
            >
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                minLength={8}
                maxLength={64}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-1 pr-10 rounded-xl bg-gray-200 text-gray-800 placeholder-gray-500 text-2xl focus:outline-none focus:ring-2 focus:ring-[#1B2559]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          
          {clientError && (
            <p className="text-xl text-red-500 mt-1 leading-tight">
              {clientError}
            </p>
          )}

          {state?.error && !clientError && (
            <p className="text-xl text-red-500 mt-1 leading-tight">
              {state.error}
            </p>
          )}

          
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-[#1B2559] hover:bg-[#121A42] text-white font-semibold text-2xl rounded-xl transition duration-200 shadow-md disabled:opacity-50 mt-2 leading-none"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-xl text-gray-600 leading-none">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#1B2559] font-bold hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};