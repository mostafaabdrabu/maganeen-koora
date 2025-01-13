import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {/* Replace the icon with an image */}
            <div className="animate-bounce">
              <Image
                src="/logo.png" // Path to your image in the public folder
                alt="Football"
                width={100} // Set the width
                height={100} // Set the height
                className="w-28 h-28" // Additional styling
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            مرحبًا بك في مسابقة مجانين كورة!
          </h1>
          <p className="text-xl text-gray-600">
            يلا جهز نفسك وابدأ اللعب دلوقتي! زود نقاطك وكن الفائز معانا بجائزة
            قيمتها <span className="font-bold text-green-500">50 ألف جنيه</span>
            !
          </p>
        </div>

        {/* Start Game Button */}
        <Link href="/quiz" className="block">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg rounded-xl transition-all transform hover:scale-105">
            ابدأ اللعب الآن
          </Button>
        </Link>

        {/* Footer Text */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>
            اختبر نفسك مع أسئلة عن تاريخ الكورة، قواعد اللعبة، وأشهر اللاعبين!
          </p>
        </div>
      </div>
    </div>
  );
}
