
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function NewPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem("duevoRecoveryVerified");

    if (verified !== "true") {
      router.replace("/forgot-password/options");
      return;
    }

    setReady(true);
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Include at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Include at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Include at least one number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo only: the password is not saved to user storage.
    sessionStorage.removeItem("duevoRecoveryVerified");
    sessionStorage.removeItem("duevoRecoveryCode");
    sessionStorage.removeItem("duevoRecoveryEmail");

    router.push("/login?recovery=demo-success");
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#E3EDF7]">
        <p className="text-[#0E1342]">Loading...</p>
      </main>
    );
  }

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center bg-[#E3EDF7] bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#E3EDF7]/85" />

      <div className="relative z-10 w-full max-w-md">
        <section className="rounded-3xl bg-[#0E1342] p-6 text-white shadow-2xl sm:p-8">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <LockKeyhole size={28} className="text-[#75D6CA]" />
            </div>
          </div>

          <h1 className="mb-3 text-center text-3xl font-semibold sm:text-4xl">
            Create New Password
          </h1>

          <p className="mb-6 text-center text-sm leading-relaxed text-gray-200 sm:text-base">
            Create a strong new password for your DueVo account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="new-password"
                className="mb-2 block text-sm font-medium"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter new password"
                  className="w-full rounded-xl bg-[#D9D9D9] px-4 py-3 pr-12 text-base text-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#36ADA3]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-medium"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Re-enter new password"
                  className="w-full rounded-xl bg-[#D9D9D9] px-4 py-3 pr-12 text-base text-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#36ADA3]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-3 text-sm">
              <p className="mb-2 font-semibold">Password requirements</p>

              <p className={hasLength ? "text-[#75D6CA]" : "text-gray-300"}>
                {hasLength ? "✓" : "○"} At least 8 characters
              </p>
              <p className={hasUpper ? "text-[#75D6CA]" : "text-gray-300"}>
                {hasUpper ? "✓" : "○"} One uppercase letter
              </p>
              <p className={hasLower ? "text-[#75D6CA]" : "text-gray-300"}>
                {hasLower ? "✓" : "○"} One lowercase letter
              </p>
              <p className={hasNumber ? "text-[#75D6CA]" : "text-gray-300"}>
                {hasNumber ? "✓" : "○"} One number
              </p>
            </div>

            {error && (
              <p role="alert" className="text-center text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#D9D9D9] px-5 py-3 font-semibold text-gray-900 shadow transition hover:bg-white"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-200 hover:underline"
            >
              Back to Login
            </Link>
          </div>

          <p className="mt-4 text-center text-xs text-gray-300">
            Demo mode only — this does not save a new password yet.
          </p>
        </section>
      </div>
    </main>
  );
}

