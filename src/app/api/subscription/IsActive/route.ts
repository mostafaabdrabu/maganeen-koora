import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching questions:", error);
    return;
  }

  console.log(subscriptions);
  return NextResponse.json(subscriptions?.status === "active");
}
