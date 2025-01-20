"use client";

import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Player = {
  id: number;
  name: string;
  score: number;
};

const mockData: Player[] = [
  { id: 1, name: "Ahmed", score: 1500 },
  { id: 2, name: "Sara", score: 1400 },
  { id: 3, name: "Khaled", score: 1350 },
  { id: 4, name: "Nora", score: 1300 },
  { id: 5, name: "Omar", score: 1250 },
  { id: 6, name: "Mostafa", score: 1200 },
  { id: 7, name: "Ziad", score: 1150 },
  { id: 8, name: "Youssef", score: 1100 },
  { id: 9, name: "Ziad", score: 1050 },
  { id: 10, name: "Youssef", score: 1000 },
];

export default function LeaderboardPage({ user }: { user: User | null }) {
  const [players] = useState(mockData);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const loggedInUser = {
    id: 10,
    avatar: "/avatars/user.png",
    name: "Mostafa",
    score: 850,
  };
  const getLeaderboard = useCallback(async () => {
    try {
      setLoading(true);

      const leaderboard = await fetch("/api/leaderboard", {
        method: "GET",
      });
      const data = await leaderboard.json();
      if (data) {
        setLeaderboard(data);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  if (loading) {
    return <div>Loading...</div>; // You can add a spinner or loading state here
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Banner */}
      <header className="max-w-md w-full text-center mb-8 z-10">
        <h1 className="text-4xl font-bold">الترتيب</h1>
        <p className="text-lg mt-2">
          أفضل 10 اللاعبين في <span className="font-semibold">مجنون كورة</span>!
        </p>
      </header>

      {/* Leaderboard Table */}
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 space-y-6">
        <table className="w-full table-auto text-gray-800">
          <thead className="rounded-lg">
            <tr className="bg-green-500 text-white">
              <th className="py-2 px-4 text-right rounded-tr-md">الترتيب</th>
              <th className="py-2 px-4 text-right">اللاعب</th>
              <th className="py-2 px-4 text-right rounded-tl-md">النقاط</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr
                key={player.id}
                className={`${
                  index < 3 ? "bg-green-100" : "bg-white"
                } border-b border-gray-300 ${
                  user?.id == player.id.toString() ? "bg-green-400" : ""
                }`}
              >
                <td className="py-2 px-4">
                  {user?.id == player.id.toString() ? "👈" : ""}
                  {index + 1 === 1
                    ? "🥇"
                    : index + 1 === 2
                    ? "🥈"
                    : index + 1 === 3
                    ? "🥉"
                    : index + 1}
                </td>
                <td className="py-2 px-4 flex items-center space-x-4">
                  <span>{player.name}</span>
                </td>
                <td className="py-2 px-4 text-right font-bold">
                  {player.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <Link href="/quiz" className="block">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg rounded-xl transition-all transform hover:scale-105">
              العب دلوقتي وزود نقاطك
            </Button>
          </Link>
        </div>
      </div>

      {/* Logged-In User */}
      {/* <h2 className="text-lg text-center font-semibold p-2">
        موقعك في الترتيب
      </h2>
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 space-y-6 ">
        <table className="w-full table-auto text-gray-800">
          <tbody>
            <tr className="bg-white border-b border-gray-300">
              <td className="py-2 px-4">14</td>
              <td className="py-2 px-4 flex items-center space-x-4">
                <span>{loggedInUser.name}</span>
              </td>
              <td className="py-2 px-4 text-right font-bold">
                {loggedInUser.score}
              </td>
            </tr>
          </tbody>
        </table>
        
      </div> */}
    </div>
  );
}
