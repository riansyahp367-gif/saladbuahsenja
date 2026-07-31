import Link from "next/link";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition-all duration-300",
        {
          "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:scale-105 hover:shadow-xl":
            variant === "primary",

          "border border-pink-500 bg-white text-pink-600 hover:bg-pink-50":
            variant === "secondary",

          "border border-gray-300 bg-white text-gray-700 hover:border-pink-500 hover:text-pink-600":
            variant === "outline",
        },
        className
      )}
    >
      {children}
    </Link>
  );
}