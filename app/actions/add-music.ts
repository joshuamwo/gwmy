"use server";

import { useSupabase } from "./supabase-server";
import { z } from "zod";
import { validateMusicData } from "./validate-music-data";
import { ValidateUser } from "./authorise-user";
import { uploadImages } from "./upload-images";
import { AddAlbum } from "./add-album";
import { AddSingleTrack } from "./add-single-track";
import { AddTrackToAlbum } from "./add-track-to-album";

export interface PrevState {
  ok: boolean | null;
  productType: string;
  error: {
    data: any;
    message: string;
    code: number;
  } | null;
  cover: string | null;
  track: string | null;
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
        cover: prevState.cover,
        track: prevState.track,
      };
    }

    const productType = prevState.productType;

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
            cover: prevState.cover,
            track: prevState.track,
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
          cover: prevState.cover,
          track: prevState.track,
        };
      }
      case "SingleTrack": {
        console.log("adding track");
        const response = await AddSingleTrack(formData, prevState);

        if (response.ok === true) {
          console.log("COMPLETED: Track added");
          return {
            ok: true,
            productType: "SingleTrack",
            error: null,
            cover: prevState.cover,
            track: prevState.track,
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
          cover: prevState.cover,
          track: prevState.track,
        };
      }
      case "Track": {
        console.log("adding track to album");
        const response = await AddTrackToAlbum(formData, prevState);

        if (response.ok === true) {
          console.log("COMPLETED: Track added");
          return {
            ok: true,
            productType: prevState.productType,
            error: null,
            cover: prevState.cover,
            track: prevState.track,
          };
        }

        console.log(response.error);
        return {
          ok: false,
          productType: prevState.productType,
          error: {
            data: JSON.stringify(response.error),
            message: "Action Failed. Try again later.",
            code: 500,
          },
          cover: prevState.cover,
          track: prevState.track,
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
          cover: prevState.cover,
          track: prevState.track,
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
      cover: prevState.cover,
      track: prevState.track,
    };
  }
}
