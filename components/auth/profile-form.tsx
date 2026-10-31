"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Settings,
  User,
  ShieldCheck,
  Bell,
  CreditCard,
  FileText,
  Download,
  LogOut,
  Home,
  Plus,
  Wallet,
  CircleUser,
  Camera,
} from "lucide-react";

import type { SessionUser } from "@/types";

type ProfileScreenProps = {
  user: SessionUser;
};

export const ProfileScreen = ({ user }: ProfileScreenProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Profile picture upload / preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Profile menu links
  const menuItems = [
    {
      icon: User,
      label: "Account Information",
      href: "/profile/account",
    },
    {
      icon: ShieldCheck,
      label: "Security & Privacy",
      href: "/profile/security",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/profile/notifications",
    },
    {
      icon: CreditCard,
      label: "Financial Preference",
      href: "/profile/financial",
    },
    {
      icon: FileText,
      label: "Report & Records",
      href: "/profile/reports",
    },
    {
      icon: Download,
      label: "Export Transaction",
      href: "/profile/export",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-[#0B133A] text-white flex flex-col min-h-screen relative overflow-hidden shadow-2xl">

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex items-center justify-between px-5 pt-7 pb-4">
        {/* Back to Dashboard */}
        <button
          onClick={() => router.push("/dashboard")}
          type="button"
          aria-label="Back to Dashboard"
          className="p-2 text-white hover:bg-white/10 rounded-full transition active:scale-95"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>

        {/* Settings */}
        <button
          onClick={() => alert("Settings screen is not available yet.")}
          type="button"
          aria-label="Settings"
          className="p-2 text-white hover:bg-white/10 rounded-full transition active:scale-95"
        >
          <Settings className="w-7 h-7" />
        </button>
      </div>

      
      <div className="flex items-center px-6 pb-7 gap-4">
        {/* Profile Picture */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change Profile Picture"
          className="relative w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 overflow-hidden shrink-0 cursor-pointer group border-2 border-white/20"
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          ) : (
            <User className="w-12 h-12 stroke-[1.5]" />
          )}

       
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Camera className="w-7 h-7 text-white" />
          </div>
        </button>

      
        <div className="min-w-0">
          <h1 className="text-4xl font-bold tracking-wide leading-none truncate">
            {user.name || "User"}
          </h1>

          <p className="text-2xl text-gray-300 font-light leading-none mt-1 truncate">
            {user.email}
          </p>
        </div>
      </div>

      
      <div className="flex-1 bg-[#E2E8F0] text-gray-900 rounded-t-[32px] px-6 pt-6 pb-28">
        <div className="space-y-2">
          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                href={item.href}
                className="w-full flex items-center gap-4 px-2 py-2.5 rounded-xl hover:bg-gray-300/60 transition duration-150 active:scale-[0.98]"
              >
                <Icon className="w-7 h-7 text-gray-800 shrink-0" />

                <span className="text-2xl font-semibold text-gray-800 leading-none">
                  {item.label}
                </span>
              </Link>
            );
          })}

          <Link
            href="/login"
            className="w-full flex items-center gap-4 px-2 py-2.5 rounded-xl hover:bg-gray-300/60 transition duration-150 active:scale-[0.98]"
          >
            <LogOut className="w-7 h-7 text-gray-800 shrink-0" />

            <span className="text-2xl font-semibold text-gray-800 leading-none">
              Log Out
            </span>
          </Link>
        </div>
      </div>

      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center text-gray-600 z-10">
        
        <Link
          href="/home"
          className="flex flex-col items-center text-lg font-medium hover:text-[#1B2559] transition"
        >
          <Home className="w-6 h-6 mb-0.5" />
          <span>Home</span>
        </Link>

      
        <Link
          href="/transactions"
          className="flex flex-col items-center text-lg font-medium hover:text-[#1B2559] transition"
        >
          <FileText className="w-6 h-6 mb-0.5" />
          <span>Transaction</span>
        </Link>


        <div className="-mt-7">
          <Link
          href="/transactions"
          className="flex flex-col items-center transition hover:text-[#36ADA3]"
        >
        </Link>

        <Link
          href="/add-transaction"
          aria-label="Add transaction"
          className="-mt-7 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#17175F] bg-white text-[#17175F] shadow-lg transition hover:bg-[#36ADA3] hover:text-white active:scale-90"
        >
          <Plus className="h-9 w-9" />
        </Link>
        </div>


        <Link
          href="/budget"
          className="flex flex-col items-center text-lg font-medium hover:text-[#1B2559] transition"
        >
          <Wallet className="w-6 h-6 mb-0.5" />
          <span>Budget</span>
        </Link>


        <Link
          href="/profile"
          className="flex flex-col items-center text-lg font-medium text-teal-500"
        >
          <CircleUser className="w-6 h-6 mb-0.5" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};