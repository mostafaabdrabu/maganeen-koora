import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maganeen Kora",
  description: "Test your soccer knowledge with our interactive quiz!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className="min-h-screen pb-20 bg-gradient-to-b from-green-500 to-green-700"
          dir="rtl"
        >
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
