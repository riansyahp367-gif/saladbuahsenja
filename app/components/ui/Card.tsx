import { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-pink-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}