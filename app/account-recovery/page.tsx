import { RecoveryForm } from "@/components/auth/recovery-form";

export default function AccountRecoveryPage() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-[#E3EDF7] bg-cover bg-center relative p-4"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}>
      
      <div className="absolute inset-0 bg-[#E3EDF7]/85 pointer-events-none" />

      <div className="relative z-10 w-full flex justify-center">
        <RecoveryForm />
      </div>
    </main>
  );
}
