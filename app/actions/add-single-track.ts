import { PrevState } from "./add-music";
import { SupabaseServer } from "./supabase-server";
import { uploadImages } from "./upload-images";
import { validateSingleTrackData } from "./validate-music-data";
import { v4 as uuidv4 } from "uuid";

export function arrayfyString(input: string) {
  if (input === "") {
    return null;
  }
  return input.split(",");
}

type AddTrackResponse = {
  ok: boolean;
  error: {
    data: any;
    message: string;
    code: number;
  } | null;
};

export async function AddSingleTrack(
  formData: FormData,
  prevState: PrevState,
): Promise<AddTrackResponse> {
	try {
			
    const supabase = SupabaseServer();
    //validate data
    console.log("validating data");
    const { validated, error } = validateSingleTrackData(formData);
    if (!validated) {
      console.error("Data validation failed");
      return {
        ok: false,
        error: {
          data: JSON.stringify(error),
          message: "Please check your inputs and try again.",
          code: 400,
        },
      };
    } else {
      console.log("Data validation success");

      //upload album cover

      if (!prevState.cover) {
        console.log("Uploading images");
        const imageUrl = await uploadImages(
          [validated.cover as File],
          "music-cover-images",
        );

        if (!imageUrl) {
          console.log("Image Upload Failed");
          return {
            ok: false,
            error: {
              data: null,
              message: "Image Upload failed. Try again later.",
              code: 501,
            },
          };
        }
        prevState.cover = imageUrl[0];
        console.log("Image uploaded");
      }

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
      const imageUrl = prevState.cover;

      console.log("prev state", prevState);
      //add data to db
      console.log("Adding data to database");
      const addDataToDBRes = await supabase
        .from("tracks")
        .insert([
          {
            id: trackId,
            name: validated.name,
            artist: validated.artist,
            price: validated.price,
            genre: validated.genre,
            cover: imageUrl,
            track: trackPath,
            other_artists: validated && arrayfyString(validated.other_artists),
            producers: validated && arrayfyString(validated.producers),
            artists_note: validated?.artists_note,
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
    console.error("Exeption caught, failed to Add Album", error);
    return {
      ok: false,
      error: {
        data: JSON.stringify(error),
        message: "Exception caught in => add-album.ts",
        code: 504,
      },
    };
  }
}
