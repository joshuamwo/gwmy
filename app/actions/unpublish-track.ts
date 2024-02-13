"use server";

import { SupabaseServer } from "./supabase-server";

export async function unpublishTrack(
  trackId: string,
): Promise<{ ok: boolean }> {
  console.log("Publish Track", trackId);

  const supabase = SupabaseServer();

  try {
    const response = await supabase
      .from("tracks")
      .update({ published: false })
      .eq("id", trackId);

    if (response.error) throw response.error;

    console.log(response);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
