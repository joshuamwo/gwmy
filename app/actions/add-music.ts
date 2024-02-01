"use server";

import { useSupabase } from "./supabase-server";
import { z } from "zod";

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
  // const supabase = useSupabase();

  try {
    // //validate user
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

    if (formData) {
      console.log("test ", formData);
      console.log("cover ", await formData.get("cover"));

      //Validate data
      const albumSchema = z.object({
        name: z.string(),
        artist: z.string(),
        price: z.coerce.number(),
        genre: z.string(),
        cover: z.any(),
        other_artists: z.string(),
        producers: z.string(),
        artists_note: z.string(),
      });

      const trackSchema = z.object({
        name: z.string(),
        artist: z.string(),
        price: z.coerce.number(),
        genre: z.string(),
        album: z.string(),
        other_artists: z.string(),
        producers: z.string(),
        artists_note: z.string(),
        track: z.any(),
      });
      const singleTrackSchema = z.object({
        name: z.string(),
        artist: z.string(),
        price: z.coerce.number(),
        genre: z.string(),
        other_artists: z.string(),
        producers: z.string(),
        artists_note: z.string(),
        cover: z.any(),
        track: z.any(),
      });

      const productType = z.string().parse(formData.get("productType"));

      //1. Case Album

      if (productType === "Album") {
        const data = albumSchema.parse({
          name: formData.get("name"),
          artist: formData.get("artist"),
          price: formData.get("price"),
          genre: formData.get("genre"),
          cover: formData.get("cover"),
          other_artists: formData.get("other_artists"),
          producers: formData.get("producers"),
          artists_note: formData.get("artists_note"),
        });
        console.log(data);
      }

      //2. Case Track

      if (productType === "Track") {
        const isSingle = z.string().parse(formData.get("isSingle"));
        if (isSingle) {
          const data = singleTrackSchema.parse({
            name: formData.get("name"),
            artist: formData.get("artist"),
            price: formData.get("price"),
            genre: formData.get("genre"),
            other_artists: formData.get("other_artists"),
            producers: formData.get("producers"),
            artists_note: formData.get("artists_note"),
            cover: formData.get("cover"),
            track: formData.get("track"),
          });
          console.log(data);
        } else {
          const data = trackSchema.parse({
            name: formData.get("name"),
            artist: formData.get("artist"),
            album: formData.get("album"),
            price: formData.get("price"),
            genre: formData.get("genre"),
            other_artists: formData.get("other_artists"),
            producers: formData.get("producers"),
            artists_note: formData.get("artists_note"),
            cover: formData.get("cover"),
            track: formData.get("track"),
          });
          console.log(data);
        }
      }

      //add data to db
    }

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
