import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Salad Buah Senja | Salad Buah Premium Palembang",
    template: "%s | Salad Buah Senja",
  },

  description:
    "Salad Buah Senja menyediakan salad buah premium dengan buah pilihan dan saus creamy yang lezat. Pesan salad buah enak dan segar di Palembang.",

  keywords: [
    "salad buah palembang",
    "salad buah senja",
    "salad buah premium",
    "salad buah enak palembang",
    "salad buah murah palembang",
    "salad buah tanjung barangan",
    "salad buah segar",
    "salad buah creamy",
  ],

  authors: [
    {
      name: "Salad Buah Senja",
    },
  ],

  creator: "Salad Buah Senja",

  metadataBase: new URL("https://saladbuahsenja-web.vercel.app"),

  openGraph: {
    title: "Salad Buah Senja | Salad Buah Premium Palembang",
    description:
      "Nikmati salad buah premium dengan buah pilihan dan saus creamy yang lezat dari Salad Buah Senja.",
    url: "https://saladbuahsenja-web.vercel.app",
    siteName: "Salad Buah Senja",
    locale: "id_ID",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
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