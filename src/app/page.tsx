"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 z-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                src="/logo.png"
                alt="Football"
                width={100}
                height={100}
                className="w-28 h-28 drop-shadow-lg"
              />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 drop-shadow-md">
            اهلا بك في مسابقة مجانين كورة!
          </h1>
          <p className="text-lg text-gray-700">
            يلا جهز نفسك وابدأ اللعب دلوقتي! زود نقاطك وكن الفائز معانا بجائزة
            قيمتها <span className="font-bold text-green-600">50 ألف جنيه</span>
            !
          </p>
        </div>

        <Link href="/quiz" className="block">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl">
            ابدأ اللعب الآن
          </Button>
        </Link>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>
            اختبر نفسك مع أسئلة عن تاريخ الكورة، قواعد اللعبة، وأشهر اللاعبين!
          </p>
        </div>
      </div>
    </div>
  );
}
