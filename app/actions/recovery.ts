"use server";

import { redirect } from "next/navigation";
import type { LoginState } from "@/types";

export async function handleAccountRecovery(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const lastPassword = formData.get("password") as string;

  if (!email || !lastPassword) {
    return { error: "Please fill in all fields." };
  }

  redirect("/account-recovery/verify");
}
