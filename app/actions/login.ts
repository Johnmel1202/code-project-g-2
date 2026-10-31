"use server";

import { redirect } from "next/navigation";
import { clearSession, setSession } from "@/lib/session";
import { findUser, verifyPassword } from "@/lib/users";
import type { LoginState } from "@/types";

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Please fill in all fields." };
  }

  
  const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    email,
  );

  if (!isEmail) {
    return { error: "Please enter a valid email address." };
  }

  const user = await findUser(email);

  
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }


  await setSession({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  
  const next = formData.get("next")?.toString() ?? "/dashboard";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  redirect(safeNext);
}

export async function nalogoutme() {
  await clearSession();
  redirect("/login");
}