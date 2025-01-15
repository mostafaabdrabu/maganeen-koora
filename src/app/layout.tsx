import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import SoccerBalls from "@/components/soccer-balls";
import { Metadata } from "next";

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
          className="bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 relative pb-20 md:pb-0 overflow-hidden"
          dir="rtl"
        >
          <SoccerBalls />
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
