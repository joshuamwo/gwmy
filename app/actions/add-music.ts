"use server";

import { useSupabase } from "./supabase-server";
import { z } from "zod";
import { validateMusicData } from "./validate-music-data";
import { ValidateUser } from "./authorise-user";
import { uploadImages } from "./upload-images";
import { AddAlbum } from "./add-album";
import { AddSingleTrack } from "./add-single-track";

interface PrevState {
  ok: boolean | null;
  productType: string;
  error: {
    data: any;
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
        ok: false,
        productType: prevState.productType,
        error: {
          data: null,
          message: "Sir! You are not allowed to be here!",
          code: 403,
        },
      };
    }

    const productType = prevState.productType;

    // if (productType == "Album") {
    //   console.log("adding music");
    //   const response = await AddAlbum(formData);
    //   if (response.ok === true) {
    //     console.log("COMPLETED: Album added");
    //     return {
    //       ok: true,
    //       productType: "Album",
    //       error: null,
    //     };
    //   }

    //   console.log(response.error);
    //   return {
    //     ok: false,
    //     productType: "Album",
    //     error: {
    //       data: response.error,
    //       message: "Action Failed",
    //       code: 500,
    //     },
    //   };
    // } else {
    //   return {
    //     ok: false,
    //     productType: prevState.productType,
    //     error: {
    //       data: prevState,
    //       message: "Configure adding track",
    //       code: 302,
    //     },
    //   };
    // }

    switch (prevState.productType) {
      case "Album": {
        console.log("adding album");
        const response = await AddAlbum(formData);

        if (response.ok === true) {
          console.log("COMPLETED: Album added");
          return {
            ok: true,
            productType: "Album",
            error: null,
          };
        }

        console.log(response.error);
        return {
          ok: false,
          productType: "Album",
          error: {
            data: JSON.stringify(response.error),
            message: "Action Failed",
            code: 500,
          },
        };
      }
      case "SingleTrack": {
        console.log("adding track");
        const response = await AddSingleTrack(formData);

        if (response.ok === true) {
          console.log("COMPLETED: Track added");
          return {
            ok: true,
            productType: "SingleTrack",
            error: null,
          };
        }

        console.log(response.error);
        return {
          ok: false,
          productType: "SingleTrack",
          error: {
            data: JSON.stringify(response.error),
            message: "Action Failed. Try again later.",
            code: 500,
          },
        };
      }
      default: {
        console.log(prevState.productType);
        return {
          ok: false,
          productType: prevState.productType,
          error: {
            data: prevState,
            message: "Music type not supported!",
            code: 302,
          },
        };
      }
    }
  } catch (error) {
    console.log("error:", error);
    return {
      ok: false,
      productType: prevState.productType,
      error: {
        data: JSON.stringify(error),
        message: "Music was not saved. Please try again later!",
        code: 502,
      },
    };
  }
}
