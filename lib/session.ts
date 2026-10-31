import "server-only";

import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./session-cookie";
import { SessionUser } from "./session-cookie";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser) {
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
