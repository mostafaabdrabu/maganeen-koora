"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    redirect("/error");
  }

  // Return the user data
  return authData.user;
}

export async function phoneLogin(formData: FormData) {
  const supabase = await createClient();
  console.log(("+2" + formData.get("phone")) as string, "phone");
  const data = {
    phone: ("+2" + formData.get("phone")) as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(
    data
  );
  if (error) {
    redirect("/error");
  }

  // Return the user data
  return authData.user;
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    phone: ("+2" + formData.get("phone")) as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signUp({
    phone: data.phone,
    password: data.password,
    options: {
      data: {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        username: formData.get("username") as string,
      },
    },
  });
  if (error) {
    redirect("/error");
  }

  // Return the user data
  return authData.user;
}
