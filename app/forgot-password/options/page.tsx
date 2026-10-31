
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RecoveryOptionsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // Demo only: no email is actually sent.
      const demoCode = String(
        Math.floor(100000 + Math.random() * 900000),
      );

      sessionStorage.setItem("duevoRecoveryEmail", normalizedEmail);
      sessionStorage.setItem("duevoRecoveryCode", demoCode);
      sessionStorage.removeItem("duevoRecoveryVerified");

      router.push("/account-recovery/verify");
    } catch (err) {
      console.error("Recovery navigation error:", err);
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center bg-[#E3EDF7] bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#E3EDF7]/85" />

      <div className="relative z-10 w-full max-w-sm">
        <section className="flex flex-col items-center rounded-3xl bg-[#0E1342] p-6 text-center text-white shadow-2xl sm:p-7">
          <h1 className="mt-2 mb-4 text-4xl font-normal leading-tight sm:text-5xl">
            Account Recovery
          </h1>

          <p className="mb-5 px-2 text-base leading-relaxed text-gray-200 sm:text-lg">
            Enter the email linked to your account.
            <br />
            We&apos;ll send a 6-digit code.
          </p>

          <form onSubmit={handleSendCode} className="w-full space-y-4">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl bg-[#D9D9D9] px-4 py-3 text-base font-medium text-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-400 sm:text-lg"
            />

            {error && (
              <p role="alert" className="text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between gap-3 pt-3 pb-2">
              <Link
                href="/account-recovery"
                className="text-base font-medium text-gray-200 hover:underline"
              >
                Back
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#D9D9D9] px-5 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-white disabled:cursor-wait disabled:opacity-60 sm:text-lg"
              >
                {loading ? "Sending..." : "Send code"}
              </button>
            </div>
          </form>

          <p className="mt-3 text-xs text-gray-300">
            Demo mode only — no email will be sent.
          </p>
        </section>
      </div>
    </main>
  );
}
