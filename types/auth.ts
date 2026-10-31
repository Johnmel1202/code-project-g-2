import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}
export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginState {
  error?: string;
}
