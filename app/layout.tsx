import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saladbuahsenja.vercel.app"),

  title: {
    default: "Salad Buah Senja | Salad Buah Premium di Palembang",
    template: "%s | Salad Buah Senja",
  },

  description:
    "Salad Buah Senja menyediakan salad buah premium dengan buah segar pilihan, saus creamy premium, dan harga terjangkau. Tersedia 4 cabang di Palembang.",

  keywords: [
    "salad buah",
    "salad buah palembang",
    "salad buah senja",
    "salad buah premium",
    "salad buah enak",
    "salad buah murah",
    "salad buah creamy",
    "dessert palembang",
    "makanan sehat palembang",
  ],

  authors: [
    {
      name: "Salad Buah Senja",
    },
  ],

  creator: "Salad Buah Senja",

  openGraph: {
    title: "Salad Buah Senja",
    description:
      "Salad buah premium dengan buah segar pilihan dan saus creamy premium. Tersedia 4 cabang di Palembang.",
    url: "https://saladbuahsenja.vercel.app",
    siteName: "Salad Buah Senja",
    locale: "id_ID",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pink-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}