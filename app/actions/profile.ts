"use server";

import { getSession } from "@/lib/session";

export async function getProfile() {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "User is not logged in.",
      user: null,
    };
  }

  return {
    success: true,
    error: null,
    user: {
      id: session.id,
      name: session.name ?? "",
      email: session.email,
    },
  };
}