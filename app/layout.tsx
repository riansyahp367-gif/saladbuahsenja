import type { Metadata } from "next";
import "./globals.css";
import LocalBusinessSchema from "./components/seo/LocalBusinessSchema";

const siteUrl = "https://saladbuahsenja-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Salad Buah Senja | Salad Buah Premium Palembang",
    template: "%s | Salad Buah Senja",
  },

  description:
    "Salad Buah Senja menyediakan salad buah premium dengan buah pilihan, saus creamy premium, keju, dan topping buah segar. Pesan salad buah enak dan segar di Palembang.",

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
  publisher: "Salad Buah Senja",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Salad Buah Senja | Salad Buah Premium Palembang",
    description:
      "Nikmati salad buah premium dengan buah pilihan, saus creamy premium, keju, dan topping buah segar dari Salad Buah Senja.",
    url: siteUrl,
    siteName: "Salad Buah Senja",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Salad Buah Senja | Salad Buah Premium Palembang",
    description:
      "Salad buah premium dengan buah segar dan saus creamy premium di Palembang.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

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
      <body>
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}