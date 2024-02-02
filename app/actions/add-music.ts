"use server";

import { useSupabase } from "./supabase-server";
import { z } from "zod";
import { validateMusicData } from "./validate-music-data";
import { ValidateUser } from "./authorise-user";
import { uploadImages } from "./upload-images";
import { AddAlbum } from "./add-album";

interface PrevState {
  productType: string;
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
    //authorise user

    const { isAdmin } = await ValidateUser();
    const authorised = isAdmin();

    if (!authorised) {
      return {
        productType: prevState.productType,
        data: null,
        error: {
          message: "Sir! You are not allowed to be here!",
          code: 403,
        },
      };
    }

    const productType = await prevState.productType;
    console.log(productType);

    if (productType == "Album") {
					const response = await AddAlbum(formData);
					console.log(response)
    } else {
      console.log(prevState);
    }
    // switch (prevState.productType) {
    //   case "Album":
    //     AddAlbum(formData);
    //     break;
    //   default:
    //     break;
    // }

    //validate data
    // const { validated, error } = validateMusicData(formData);
    // if (error) {
    //   return {
    //     productType: prevState.productType,
    //     data: null,
    //     error: {
    //       message: "Please check your inputs and try again.",
    //       code: 400,
    //     },
    //   };
    // }
    // console.log(validated);

    //upload files
    // case album
    //add data to db

    return {
      productType: prevState.productType,
      data: {
        id: "track / album id",
      },
      error: null,
    };
  } catch (error) {
    console.log("error:", error);
    return {
      productType: prevState.productType,
      data: null,
      error: {
        message: "Music was not saved. Please try again later!",
        code: 502,
      },
    };
  }
}
