
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#1b1c4f]">
      <Image
        src="/bg-image.png"
        alt=""
        fill
        priority
        className="object-cover"
      />

      <div className="relative mx-auto flex h-full w-full max-w-[430px] flex-col items-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-center">
        <div className="relative mt-[4vh] h-[16vh] max-h-[130px] w-full">
          <Image
            src="/DueVo.png"
            alt="DueVo logo"
            fill
            priority
            className="object-contain"
          />
        </div>

        <h2 className="mt-[2vh] text-2xl font-semibold text-[#fdf6d8]">
          Welcome to
        </h2>

        <h1 className="text-5xl font-bold leading-tight text-[#3ecfb2]">
          DueVo!
        </h1>

        <p className="mt-[1.5vh] text-base leading-snug text-[#fdf6d8]">
          Your personal finance companion.
          <br />
          Stay on track, pay on time.
        </p>

        <div className="relative my-[2vh] min-h-0 w-full flex-1">
          <Image
            src="/welcome-illustration.png"
            alt="Phone, calendar and wallet illustration"
            fill
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="flex w-full items-center justify-center gap-4 rounded-full bg-[#fdf6d8] py-[1.8vh] text-2xl font-semibold text-[#1b1c4f] transition active:scale-95 hover:brightness-95"
        >
          Get Started
          <ArrowRight size={22} />
        </button>
      </div>
    </main>
  );
}
