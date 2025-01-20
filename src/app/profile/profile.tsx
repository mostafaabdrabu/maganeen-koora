"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings } from "lucide-react";
import { User } from "@supabase/supabase-js";

export default function Profile({ user }: { user: User | null }) {
  const supabase = createClient();
  const [userData, setUserData] = useState<any>(null); // Store user data
  const [userPoints, setUserPoints] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Function to fetch user data
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, last_name, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
      console.log(data);
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  const getUserPoints = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("user_competitions")
        .select(`points_earned`)
        .eq("user_id", user?.id)
        .single();
      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
      console.log(data);
      if (data) {
        setUserPoints(data.points_earned);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  useEffect(() => {
    getUserPoints();
  }, [user, getUserPoints]);

  if (loading) {
    return <div>Loading...</div>; // You can add a spinner or loading state here
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 relative">
        {/* Settings Button */}
        <Link href="/account" className="absolute top-4 right-4">
          <Button variant="outline" className="p-2 rounded-full">
            <Settings size={20} />
          </Button>
        </Link>

        {/* User Name */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {userData?.first_name} {userData?.last_name}
        </h1>

        {/* Phone Number */}
        <p className="text-gray-600 text-center mb-6">
          {userData?.phone_number}
        </p>

        {/* Points Section */}

        <div className="bg-green-200 p-6 rounded-xl text-center mb-6">
          <p className="text-4xl font-bold text-green-700 mb-2">
            {userPoints || "انت لست مشترك"}
          </p>
          {!userPoints || <p className="text-sm text-green-600">نقاطى</p>}
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
