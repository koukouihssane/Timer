import type { Metadata } from "next";
import { Fjalla_One } from "next/font/google";
import "./globals.css";

const fontObject = Fjalla_One({
  subsets: ["latin"],
  variable: "--font-fjalla-one",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Timer",
  description: "Full-screen Timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontObject.variable}>{children}</body>
    </html>
  );
}
