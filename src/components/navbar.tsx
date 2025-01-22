"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FileText, Trophy } from "lucide-react";
import Image from "next/image"; // For using the logo image

import { User as UserEntity } from "@supabase/supabase-js";
import useUserStore from "@/store/userStore";

export function Navbar() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const isActive = (path: string) => pathname === path;

  const showNavbar = pathname !== "/login";
  if (!showNavbar) return null;
  if (!user) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 py-4 px-8">
        <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/logo.png" // Replace with your logo path
                alt="مجنون كورة Logo"
                width={40} // Adjust logo size
                height={40}
                className="rounded-full" // Optional: Add styling to the logo
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`flex items-center space-x-2 hover:text-green-500 ${
                isActive("/") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <span className="text-sm">Home</span>
            </Link>
            <Link
              href="/profile"
              className={`flex items-center space-x-2 hover:text-green-500 ${
                isActive("/profile") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <span className="text-sm">Profile</span>
            </Link>
            <Link
              href="/leaderboard"
              className={`flex items-center space-x-2 hover:text-green-500 ${
                isActive("/leaderboard") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <span className="text-sm">Leaderboard</span>
            </Link>
            <Link
              href="/terms"
              className={`flex items-center space-x-2 hover:text-green-500 ${
                isActive("/terms") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <span className="text-sm">Terms</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-t border-gray-200 py-2 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Navigation Links */}
          <div className="flex justify-around items-center">
            <Link
              href="/"
              className={`flex flex-col items-center p-2 ${
                isActive("/") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              href="/profile"
              className={`flex flex-col items-center p-2 ${
                isActive("/profile") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <Link
              href="/leaderboard"
              className={`flex flex-col items-center p-2 ${
                isActive("/leaderboard") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs mt-1">Leaderboard</span>
            </Link>
            <Link
              href="/terms"
              className={`flex flex-col items-center p-2 ${
                isActive("/terms") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs mt-1">Terms</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
