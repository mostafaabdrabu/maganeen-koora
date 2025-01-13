"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SoccerBalls() {
  const soccerBalls = [
    { size: 50, top: "10%", left: "15%", duration: 3, yOffset: -20 },
    { size: 40, bottom: "20%", right: "15%", duration: 2.5, yOffset: -30 },
    { size: 30, top: "50%", left: "25%", duration: 2, yOffset: -40 },
    { size: 60, bottom: "10%", left: "10%", duration: 3.5, yOffset: -25 },
    { size: 45, top: "30%", right: "20%", duration: 2.8, yOffset: -35 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {soccerBalls.map((ball, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full border-4 border-black shadow-lg"
          style={{
            width: ball.size,
            height: ball.size,
            top: ball.top,
            left: ball.left,
            right: ball.right,
            bottom: ball.bottom,
          }}
          animate={{
            y: [0, ball.yOffset, 0],
          }}
          transition={{
            duration: ball.duration,
            repeat: Infinity,
          }}
        >
          <Image
            src="/football.png"
            alt="Football"
            width={100}
            height={100}
            // className="w-28 h-28 drop-shadow-lg"
          />
        </motion.div>
      ))}
    </div>
  );
}
