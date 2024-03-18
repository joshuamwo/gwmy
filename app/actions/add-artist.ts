"use server";

import { ValidateUser } from "./authorise-user";
import { SupabaseServer } from "./supabase-server";
import { uploadImages } from "./upload-images";
import { validateArtistData } from "./validate-music-data";

type PrevState = {
  ok: boolean | null;
  error: {
    data: any;
    message: string;
    code: number;
  } | null;
  profile_picture: string | null;
};

export async function addArtist(
  prevState: PrevState,
  formData: FormData,
): Promise<PrevState> {
  try {
    const supabase = SupabaseServer();
    //authorise user

    const { isAdmin } = await ValidateUser();
    const authorised = isAdmin();

    if (!authorised) {
      return {
        ok: false,
        error: {
          data: null,
          message: "Sir! You are not allowed to be here!",
          code: 403,
        },
        profile_picture: prevState.profile_picture,
      };
    }

    //validate data
    console.log("validating data");
    console.log(formData.get("phone_number"));
    console.log(formData.get("id_number"));
    const { validated, error } = validateArtistData(formData);
    if (!validated) {
      console.error("Data validation failed", error);
      return {
        ok: false,
        error: {
          data: JSON.stringify(error),
          message: "Please check your inputs and try again.",
          code: 400,
        },
        profile_picture: prevState.profile_picture,
      };
    } else {
      console.log("Data validation success", validated);

      //upload artist profile picture

      if (!prevState.profile_picture) {
        console.log("Uploading profile picture");
        const imageUrl = await uploadImages(
          [validated.profile_picture as File],
          "music-images",
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
            profile_picture: prevState.profile_picture,
          };
        }
        prevState.profile_picture = imageUrl[0];
        console.log("Image uploaded");
      }

      const imageUrl = prevState.profile_picture;

      console.log("prev state", prevState);
      //add data to db
      console.log("Adding data to database");
      const addDataToDBRes = await supabase
        .from("artists")
        .insert([
          {
            first_name: validated.first_name,
            last_name: validated.last_name,
            alias: validated.alias,
            id_number: validated.id_number,
            phone_number: validated.phone_number,
            profile_picture: imageUrl,
            recording_label: validated.recording_label,
          },
        ])
        .single();

      if (addDataToDBRes.error) {
        console.error("Failed to add data to DB");
        console.log(addDataToDBRes.error);
        return {
          ok: false,
          error: {
            data: JSON.stringify(addDataToDBRes.error),
            message: "Adding data to database failed",
            code: 500,
          },
          profile_picture: prevState.profile_picture,
        };
      }
      console.log("Data Added to DB");
      console.log(addDataToDBRes);
      return {
        ok: true,
        error: null,
        profile_picture: prevState.profile_picture,
      };
    }
  } catch (error) {
    console.error("Exeption caught, failed to Add Artist", error);
    return {
      ok: false,
      error: {
        data: JSON.stringify(error),
        message: "Exception caught in => add-artist.ts",
        code: 504,
      },
      profile_picture: prevState.profile_picture,
    };
  }
}
