import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Salad Buah Senja | Salad Buah Premium Palembang",
    template: "%s | Salad Buah Senja",
  },

  description:
    "Salad Buah Senja menyediakan salad buah premium dengan buah segar dan saus creamy, serta dessert dan fruit sandwich. Fresh setiap hari di Palembang.",

  keywords: [
    "salad buah Palembang",
    "salad buah premium Palembang",
    "salad buah enak Palembang",
    "salad buah terdekat",
    "dessert Palembang",
    "Oreo Cheesecake Palembang",
    "Red Velvet Cheesecake Palembang",
    "Regal Cheesecake Palembang",
    "fruit sandwich Palembang",
    "Salad Buah Senja",
  ],

  authors: [
    {
      name: "Salad Buah Senja",
    },
  ],

  creator: "Salad Buah Senja",

  applicationName: "Salad Buah Senja",

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

  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Salad Buah Senja",
    title: "Salad Buah Senja | Salad Buah Premium Palembang",
    description:
      "Salad buah premium dengan buah segar, saus creamy, dessert, dan fruit sandwich. Fresh setiap hari.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Salad Buah Senja | Salad Buah Premium Palembang",
    description:
      "Salad buah premium, dessert, dan fruit sandwich. Fresh setiap hari.",
  },
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