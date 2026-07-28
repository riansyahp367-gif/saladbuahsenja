type BadgeProps = {
  children: React.ReactNode;
  color?: "pink" | "green" | "yellow";
};

export default function Badge({
  children,
  color = "pink",
}: BadgeProps) {
  const colors = {
    pink: "bg-pink-100 text-pink-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
}