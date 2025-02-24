import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

interface RequestBody {
  points_earned: number;
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  if (!body.points_earned) {
    return NextResponse.error();
  }
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  try {
    // Call the SQL function to update points
    const { data, error } = await supabase.rpc("update_points_earned", {
      logged_in_user_id: user?.id,
      points_to_add: body.points_earned,
    });

    if (error) {
      console.error("Error updating points:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Points updated successfully", data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
