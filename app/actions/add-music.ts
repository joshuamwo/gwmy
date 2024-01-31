"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { useSupabase } from "./supabase-server";

interface ImageUploadProps {
  folder: string;
  files: File[] | File;
}

export async function AddMusic(prevState: any, formData: FormData) {
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
    } else if (!data || data.length < 1) {
      return {
        data: null,
        error: {
          message: "Unauthorised to perform this action!",
          code: 500,
        },
      };
    }

    console.log(data);

    console.log("test ", formData, prevState);

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
