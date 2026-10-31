import { promises as fs } from "fs";
import path from "path";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export type StoredUser = {
  id: string;
  name: string;
  email: string; // email O mobile number, naka-normalize
  passwordHash: string;
  createdAt: string;
};

const DB_PATH = path.join(process.cwd(), "data", "users.json");

async function readUsers(): Promise<StoredUser[]> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return []; // wala pang file = wala pang users
  }
}

async function writeUsers(users: StoredUser[]) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase();
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function findUser(identifier: string) {
  const users = await readUsers();
  const key = normalizeIdentifier(identifier);
  return users.find((u) => u.email === key) ?? null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const users = await readUsers();
  const user: StoredUser = {
    id: `usr_${Date.now()}`,
    name: data.name,
    email: normalizeIdentifier(data.email),
    passwordHash: hashPassword(data.password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  return user;
}