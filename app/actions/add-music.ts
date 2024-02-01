"use server";

import { useSupabase } from "./supabase-server";
import { z } from "zod";
import { validateMusicData } from "./validate-music-data";
import { ValidateUser } from "./authorise-user";

interface PrevState {
  data: {
    id: string;
  } | null;
  error: {
    message: string;
    code: number;
  } | null;
}

export async function AddMusic(
  prevState: PrevState,
  formData: FormData,
): Promise<PrevState> {
  // const supabase = useSupabase();

  try {
    // //authorise user
    // const { data, error } = await supabase.from("profiles").select("*");

    // //handle error and user unauthorised
    // if (error) {
    //   console.log(error);
    //   return {
    //     data: null,
    //     error: {
    //       message: "Music was not added! Try Again Later!",
    //       code: 500,
    //     },
    //   };
    // } else if (!data || data.length < 1 || data[0].user_type !== "alpha") {
    //   return {
    //     data: null,
    //     error: {
    //       message: "Sir! You are not allowed to be here!",
    //       code: 403,
    //     },
    //   };
    // }
    // console.log(data);

    //authorise user

    // const { isAdmin } = await ValidateUser();
    // const authorised = isAdmin();

    // if (!authorised) {
    //   return {
    //     data: null,
    //     error: {
    //       message: "Sir! You are not allowed to be here!",
    //       code: 403,
    //     },
    //   };
    // }

    //validate data
    const { validated, error } = validateMusicData(formData);
    if (error) {
      return {
        data: null,
        error: {
          message: "Please check your inputs and try again.",
          code: 400,
        },
      };
    }
    console.log(validated);
    //upload files

    //add data to db

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
        message: "Music was not saved. Please try again later!",
        code: 502,
      },
    };
  }
}
