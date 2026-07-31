import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600","700","800"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Salad Buah Senja",
  description: "Fresh Every Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans bg-pink-50`}
      >
        {children}
      </body>
    </html>
  );
}