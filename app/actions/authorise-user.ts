import { SupabaseServer } from "./supabase-server";

export async function ValidateUser() {
  const supabase = SupabaseServer();
  const { data, error } = await supabase.from("profiles").select("*");

  function isAdmin(): boolean {
    //handle error and user unauthorised
    if (error) {
      return false;
    } else if (data[0].user_type === "alpha") {
      return true;
    }
    return false;
  }

  function isAuthenticated(): boolean {
    //handle error and user unauthorised
    if (error) {
      return false;
    } else if (!data || data.length < 1) {
      return false;
    }
    return true;
  }

  return { isAdmin, isAuthenticated };
}
