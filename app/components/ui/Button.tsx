import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:pointer-events-none";

  const sizes = {
    sm: "rounded-xl px-4 py-2 text-sm",
    md: "rounded-2xl px-6 py-3 text-base",
    lg: "rounded-2xl px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl",

    secondary:
      "bg-white border border-pink-200 text-pink-600 shadow-lg hover:bg-pink-50 hover:-translate-y-1",

    outline:
      "border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white",

    ghost:
      "text-pink-600 hover:bg-pink-100",

    whatsapp:
      "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl",
  };

  const style = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={style}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}