"use client";
 
import { useRouter } from "next/navigation";
import {
  CornerDownLeft,
  User,
  ShieldCheck,
  Bell,
  MapPin,
  Globe,
  CircleHelp,
  FileText,
  LogOut,
  type LucideIcon,
} from "lucide-react";
 
type SettingsItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};
 
type SettingsSection = {
  title: string;
  items: SettingsItem[];
};
 
type SettingsUser = {
  name: string;
  email: string;
  avatar?: string | null;
};
 
type SettingsScreenProps = {
  user?: SettingsUser;
  onLogout?: () => void;
};
 

const SECTIONS: SettingsSection[] = [
  {
    title: "Account",
    items: [
      { label: "Personal Information", icon: User, href: "/settings/personal-information" },
      { label: "Security & Privacy", icon: ShieldCheck, href: "/settings/security" },
    ],
  },
  {
    title: "App Preferences",
    items: [
      { label: "Notifications", icon: Bell, href: "/settings/notifications" },
      { label: "Location", icon: MapPin, href: "/settings/location" },
      { label: "Language", icon: Globe, href: "/settings/language" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help & FAQs", icon: CircleHelp, href: "/help" },
      { label: "Term & Conditions", icon: FileText, href: "/terms" },
      { label: "Privacy Policy", icon: ShieldCheck, href: "/privacy" },
    ],
  },
];
 
type SettingsRowProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  danger?: boolean;
};
 
function SettingsRow({ icon: Icon, label, onClick, danger = false }: SettingsRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-center gap-4 rounded-xl px-2 py-3 text-left transition-colors active:opacity-60 ${
        danger ? "hover:bg-red-50" : "hover:bg-neutral-100"
      }`}
    >
      <Icon
        size={22}
        strokeWidth={1.6}
        className={danger ? "text-red-600" : "text-neutral-900"}
      />
      <span
        className={`text-[13px] font-medium ${
          danger ? "text-red-600" : "text-neutral-900"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
 
export default function SettingsScreen({
  user = { name: "Jhonrick Arabis", email: "jhonrickarabis@gmail.com", avatar: null },
  onLogout,
}: SettingsScreenProps) {
  const router = useRouter();
 
  const handleLogout = () => {
    if (onLogout) return onLogout();
    router.push("/login");
  };
 
  return (
    <div className="flex min-h-screen justify-center bg-white">
    
    <main className="min-h-screen w-full max-w-[430px] bg-white px-5 pb-10 pt-6 sm:border-x sm:border-neutral-100">
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="-ml-1 cursor-pointer rounded-full p-1 text-[#1E1B6B] transition-colors hover:bg-neutral-100"
      >
        <CornerDownLeft size={30} strokeWidth={2.5} />
      </button>
 
      
      <section className="mt-5 flex items-center gap-4">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#EBD9C0]">
          {user.avatar ? (
            
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <User size={30} strokeWidth={2} className="text-neutral-900" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-bold text-neutral-900">{user.name}</p>
          <p className="truncate text-[12px] text-[#A68A78]">{user.email}</p>
        </div>
      </section>
 
    
      <div className="mt-6 space-y-5">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-[14px] font-medium text-[#C2B3A3]">{section.title}</h2>
            <div className="mt-2 pl-1">
              {section.items.map((item) => (
                <SettingsRow
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => router.push(item.href)}
                />
              ))}
 
         
              {section.title === "Support" && (
                <SettingsRow icon={LogOut} label="Log Out" onClick={handleLogout} danger />
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
    </div>
  );
}