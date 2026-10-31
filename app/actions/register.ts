"use server";

import { redirect } from "next/navigation";
import { createUser, findUser } from "@/lib/users";
import type { LoginState } from "@/types";

export async function register(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const fullName =
    formData.get("fullName")?.toString().trim() ?? "";

  const email =
    formData.get("email")?.toString().trim().toLowerCase() ?? "";

  const password =
    formData.get("password")?.toString() ?? "";

  const confirmPassword =
    formData.get("confirmPassword")?.toString() ?? "";

  
  if (!fullName || !email || !password || !confirmPassword) {
    return {
      error: "Please fill in all fields.",
    };
  }


  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(fullName) || fullName.length < 2) {
    return {
      error: "Full Name should contain letters and spaces only.",
    };
  }

  
  const gmailRegex =
    /^[a-z0-9](?:[a-z0-9.]*)[a-z0-9]@gmail\.com$|^[a-z0-9]@gmail\.com$/;

  if (!gmailRegex.test(email) || email.includes("..")) {
    return {
      error: "Please use a valid Gmail address.",
    };
  }

 
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    return {
      error:
        "Password must be 8+ characters with uppercase, lowercase, number, and special character.",
    };
  }

  
  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
    };
  }

 
  const existing = await findUser(email);

  if (existing) {
    return {
      error: "This email is already registered.",
    };
  }

  
  await createUser({
    name: fullName,
    email,
    password,
  });

  
  redirect("/login");
}
