import { useSupabase } from "./supabase-server";
import { uploadImages } from "./upload-images";
import { validateAlbumData } from "./validate-music-data";

function arrayfyString(input: string) {
  if (input === "") {
    return null;
  }
  return input.split(",");
}

type AddAlbumResponse = {
  ok: boolean;
  error: {
    data: any;
    message: string;
    code: number;
  };
};

export async function AddAlbum(formData: FormData): Promise<AddAlbumResponse> {
  try {
    const supabase = useSupabase();
    //validate data
    console.log("validating data");
    const { validated, error } = validateAlbumData(formData);
    if (error) {
      console.error("Data validation failed");
      return {
        ok: false,
        error: {
          data: error,
          message: "Please check your inputs and try again.",
          code: 400,
        },
      };
    }

    // //upload album cover
    // const imageUrl = await uploadImages(
    //   [formData.get("cover") as File],
    //   "music-cover-images",
    // );

    if (validated) {
      console.log("Data validation success");
      //upload album cover
      console.log("Uploading images");
      const imageUrl = await uploadImages(
        [validated.cover as File],
        "music-cover-images",
      );

      imageUrl && console.log("Image uploaded");

      console.log("Adding data to databae");

      //add data to db
      const response = await supabase
        .from("albums")
        .insert([
          {
            name: validated.name,
            artist: validated.artist,
            price: validated.price,
            genre: validated.genre,
            cover: imageUrl,
            other_artists: arrayfyString(validated.other_artists),
            producers: arrayfyString(validated.producers),
            artists_note: validated.artists_note,
          },
        ])
        .single();

      if (response.error) {
        console.error("Failed to add data to DB");
        console.log(response.error);
        return {
          ok: false,
          error: {
            data: response.error,
            message: "Adding data to database failed",
            code: 500,
          },
        };
      }
      console.log("Data Added to DB");
      console.log(response);
      return {
        ok: true,
        error: {
          data: null,
          message: "Album Added",
          code: 200,
        },
      };
    }
    console.error("Validation returned no data and no error => add-album.ts");
    //return response
    return {
      ok: false,
      error: {
        data: null,
        message: "Validation returned no data and no error => add-album.ts",
        code: 504,
      },
    };
  } catch (error) {
    console.error("Exeption caught, failed to Add Album", error);
    return {
      ok: false,
      error: {
        data: error,
        message: "Exception caught in => add-album.ts",
        code: 504,
      },
    };
  }
}
