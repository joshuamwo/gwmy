"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { useSupabase } from "./supabase-server";

interface PrevState {
  data: {
    id: string;
  } | null;
  error: {
    message: string;
    code: number;
  } | null;
}

export async function AddMusic(prevState: PrevState, formData: FormData) {
  const supabase = useSupabase();

  try {
    //validate user
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.log(error);
      return {
        data: null,
        error: {
          message: "Music was not added! Try Again Later!",
          code: 500,
        },
      };
    } else if (!data || data.length < 1 || data[0].user_type !== "alpha") {
      return {
        data: null,
        error: {
          message: "Sir! You are not allowed to be here!",
          code: 403,
        },
      };
    }

    console.log(data);

    console.log("test ", formData);

    return {
      data: {
        id: "track / album id",
      },
      error: null,
    };
  } catch (error) {
    console.log("error:", error);
    return {
      data: null,
      error: {
        message: "Server Error",
        code: 502,
      },
    };
  }
}
