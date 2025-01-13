import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        {/* User Name */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Mostafaabdrabu
        </h1>

        {/* Phone Number */}
        <p className="text-gray-600 text-center mb-6">01553977618</p>

        {/* Points Section */}
        <div className="bg-green-200 p-6 rounded-xl text-center mb-6">
          <p className="text-4xl font-bold text-green-700 mb-2">500 🪙 </p>
          <p className="text-sm text-green-600">نقاطى</p>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            يلا زود نقاطك علشان تكون من الفايزين العب دلوقتى وزود نقاطك
          </p>
          <Link href="/quiz" className="block">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg rounded-xl transition-all transform hover:scale-105">
              العب دلوقتي وزود نقاطك
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
