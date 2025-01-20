import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  let { data: user_competitions, error } = await supabase
    .from("user_competitions")
    .select(
      `
    user_id,
    id,
    competition_id,
    points_earned,
    profiles (
        id,
        first_name,
        last_name
    ),
    competitions (
        id,
        name,
        start_date,
        end_date,
        prize_amount
    )
  `
    )
    .gt("competitions.end_date", new Date().toISOString())
    .lt("competitions.start_date", new Date().toISOString())
    .order("points_earned", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching choices:", error);
    return;
  }
  if (!user_competitions) {
    return NextResponse.json([]);
  }
  const leaderBoard = user_competitions.map((item) => ({
    id: item.user_id,
    name: item.profiles.first_name,
    score: item.points_earned,
  }));

  return NextResponse.json(leaderBoard);
}
