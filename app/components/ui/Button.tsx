import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-7 py-4 font-semibold transition-all duration-300";

  const styles = {
    primary:
      "bg-pink-600 text-white hover:bg-pink-700 shadow-lg hover:shadow-xl hover:-translate-y-1",

    secondary:
      "border-2 border-pink-600 text-pink-600 hover:bg-pink-50",
  };

  return (
    <Link
      href={href}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}