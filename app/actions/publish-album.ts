"use server";

import { Track } from "@/types";
import { SupabaseServer } from "./supabase-server";

export async function publishAlbum(albumId: string): Promise<{ ok: boolean }> {
  console.log("Publish Album", albumId);

  const supabase = SupabaseServer();

  try {
    const { data, error } = await supabase
      .from("tracks")
      .select("*")
      .eq("album", albumId)
      .returns<Track[]>();

    if (error) {
      return {
        ok: false,
      };
    }
    //
    if (data) {
      console.log(data);

      data.map(async (track) => {
        const { error } = await supabase
          .from("tracks")
          .update({ published: true })
          .eq("id", track.id);

        if (error) throw error;
      });

      const response = await supabase
        .from("albums")
        .update({ published: true })
        .eq("id", albumId);

      if (response.error) throw error;

      console.log(response);

      return {
        ok: true,
      };
    }
    throw "Server Error";
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
