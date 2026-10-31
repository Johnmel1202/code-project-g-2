import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ProfileScreen } from "@/components/auth/profile-form";

export default async function ProfilePage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-[#1B2559] bg-cover bg-center relative p-4"
      style={{
        backgroundImage: "url('/bg-image.png')",
      }}
    >
      <div className="absolute inset-0 bg-[#0E1538]/80 pointer-events-none" />

      <div className="relative z-10 w-full flex justify-center">
        <ProfileScreen user={user} />
      </div>
    </main>
  );
}