import { ReactNode } from "react";

export type Theme = "light" | "dark";

export type LayoutProps = {
  children: ReactNode;
};

export type PageHeaderProps = {
  title: string;
  description?: string;
};

export type AvatarProps = {
  initial: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "neutral";
};

export type CardProps = {
  children: ReactNode;
  className?: string;
};

export type SettingToggleProps = {
  label?: string;
  isChecked?: boolean;
};

export type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
};
