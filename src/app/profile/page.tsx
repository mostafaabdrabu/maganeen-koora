import { createClient } from "@/utils/supabase/server";
import Profile from "./profile";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Profile user={user} />
      </div>
    </div>
  );
}
