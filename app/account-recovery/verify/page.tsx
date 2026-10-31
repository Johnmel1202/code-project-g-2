
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

export default function VerifyRecoveryPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("duevoRecoveryEmail");
    const savedCode = sessionStorage.getItem("duevoRecoveryCode");

    if (!savedEmail || !savedCode) {
      router.replace("/forgot-password/options");
      return;
    }

    setEmail(savedEmail);
    setDemoCode(savedCode);
    setReady(true);
  }, [router]);

  function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const savedCode = sessionStorage.getItem("duevoRecoveryCode");

    if (!savedCode) {
      setError("No demo code found. Please request a new one.");
      return;
    }

    if (code !== savedCode) {
      setError("Incorrect code. Please try again.");
      return;
    }

    sessionStorage.setItem("duevoRecoveryVerified", "true");
    router.push("/account-recovery/new-password");
  }

  function handleResend() {
    const newCode = String(
      Math.floor(100000 + Math.random() * 900000),
    );

    sessionStorage.setItem("duevoRecoveryCode", newCode);
    setDemoCode(newCode);
    setCode("");
    setError("A new demo code has been generated.");
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#E3EDF7] p-4">
        <p className="text-[#0E1342]">Loading verification...</p>
      </main>
    );
  }

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center bg-[#E3EDF7] bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#E3EDF7]/85" />

      <div className="relative z-10 w-full max-w-sm">
        <section className="flex flex-col items-center rounded-3xl bg-[#0E1342] p-6 text-center text-white shadow-2xl sm:p-7">
          <h1 className="mb-4 text-4xl font-normal leading-tight sm:text-5xl">
            Account Recovery
          </h1>

          <p className="text-sm leading-relaxed text-gray-200">
            Your demo verification code is shown below.
          </p>

          <p className="mt-1 mb-3 max-w-full break-all text-base font-semibold">
            {email}
          </p>

          <div className="mb-4 rounded-xl border border-white/20 bg-white/10 px-6 py-3">
            <p className="mb-1 text-xs text-gray-300">
              DEMO CODE — NOT EMAILED
            </p>
            <p className="text-3xl font-bold tracking-[0.3em] text-[#75D6CA]">
              {demoCode}
            </p>
          </div>

          <form onSubmit={handleVerify} className="w-full space-y-4">
            <label htmlFor="code" className="sr-only">
              Six-digit code
            </label>

            <input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              pattern="[0-9]{6}"
              placeholder="Enter 6-digit code"
              required
              value={code}
              onChange={(event) => {
                setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                setError("");
              }}
              className="w-full rounded-xl bg-[#D9D9D9] px-4 py-3 text-center text-xl font-semibold tracking-widest text-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
            />

            {error && (
              <p
                role="status"
                className={`text-sm ${
                  error.startsWith("A new")
                    ? "text-[#75D6CA]"
                    : "text-red-300"
                }`}
              >
                {error}
              </p>
            )}

            <div className="flex items-center justify-between gap-3">
              <Link
                href="/forgot-password/options"
                className="text-base text-gray-200 hover:underline"
              >
                Back
              </Link>

              <button
                type="submit"
                className="rounded-xl bg-[#D9D9D9] px-5 py-3 text-base font-semibold text-gray-900 hover:bg-white"
              >
                Verify code
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={handleResend}
            className="mt-4 text-sm text-gray-200 underline hover:text-white"
          >
            Resend demo code
          </button>

          <p className="mt-3 text-xs text-gray-300">
            Demo mode only — no email will be sent.
          </p>
        </section>
      </div>
    </main>
  );
}
