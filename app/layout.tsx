import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salad Buah Senja",
  description: "Salad buah premium harga minimum",
  verification: {
    google: "nPsntuosfxTO7qQhjYzKftYl5nKPOZZGZYXwQ7QCaCc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}