"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FileText } from "lucide-react";
import Image from "next/image"; // For using the logo image

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

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
              className={`flex items-center space-x-2 ${
                isActive("/") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-sm">Home</span>
            </Link>
            <Link
              href="/profile"
              className={`flex items-center space-x-2 ${
                isActive("/profile") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-sm">Profile</span>
            </Link>
            <Link
              href="/terms"
              className={`flex items-center space-x-2 ${
                isActive("/terms") ? "text-green-500" : "text-gray-600"
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm">Terms</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-t border-gray-200 py-2 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Logo Section (Optional for Mobile) */}
          <div className="flex justify-center mb-2">
            <Link href="/">
              <Image
                src="/logo.png" // Replace with your logo path
                alt="مجنون كورة Logo"
                width={30} // Adjust logo size for mobile
                height={30}
                className="rounded-full" // Optional: Add styling to the logo
              />
            </Link>
          </div>

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
