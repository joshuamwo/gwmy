import { PrevState } from "./add-music";
import { arrayfyString } from "./add-single-track";
import { SupabaseServer } from "./supabase-server";
import { uploadImages } from "./upload-images";
import { v4 as uuidv4 } from "uuid";
import { validateAlbumTrackData } from "./validate-music-data";

type AddTrackToAlbumResponse = {
  ok: boolean;
  error: {
    data: any;
    message: string;
    code: number;
  } | null;
};

export async function AddTrackToAlbum(
  formData: FormData,
  prevState: PrevState,
): Promise<AddTrackToAlbumResponse> {
  try {
    const supabase = SupabaseServer();

    //validate data

    console.log("Validating data!");
    const { validated, error } = validateAlbumTrackData(formData);
    if (!validated) {
      console.error("Data validation failed");
      return {
        ok: false,
        error: {
          data: error,
          message: "Please check your inputs and try again.",
          code: 400,
        },
      };
    } else {
      console.log("Data validation success");

      let trackId = prevState.track ? prevState.track.split("/")[1] : null;

      //upload track

      if (!prevState.track) {
        console.log("Uploading track");
        trackId = `${uuidv4()}`;
        const trackFile = validated.track as File;
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        const { error, data } = await supabase.storage
          .from("tracks")
          .upload(`/${userId}/${trackId}`, trackFile);
        if (error) {
          return {
            ok: false,
            error: {
              data: null,
              message: "Track upload failed. Try again later.",
              code: 501,
            },
          };
        }
        prevState.track = data.path;
      }

      console.log("Track added");

      const trackPath = prevState.track;

      console.log("prev state", prevState);

      //add data to db

      console.log("Adding data to database");
      const album: {
        id: string;
        name: string;
      } = JSON.parse(validated.album);
      const addDataToDBRes = await supabase
        .from("tracks")
        .insert([
          {
            id: trackId,
            name: validated.name,
            artist: validated.artist,
            price: validated.price,
            album: album.id,
            genre: validated.genre,
            track: trackPath,
            other_artists: validated && arrayfyString(validated.other_artists),
            producers: validated && arrayfyString(validated.producers),
            artists_note: validated?.artists_note,
            published: validated.is_published === "true" ? true : false,
          },
        ])
        .single();

      if (addDataToDBRes.error) {
        console.error("Failed to add data to DB");
        console.log(addDataToDBRes.error);
        return {
          ok: false,
          error: {
            data: addDataToDBRes.error,
            message: "Adding data to database failed",
            code: 500,
          },
        };
      }
      console.log("Data Added to DB");
      console.log(addDataToDBRes);
      return {
        ok: true,
        error: {
          data: null,
          message: "Album Added",
          code: 200,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        data: error,
        message: "Failed to add track!",
      },
    };
  }
}
