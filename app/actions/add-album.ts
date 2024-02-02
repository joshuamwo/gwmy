import { useSupabase } from "./supabase-server";
import { uploadImages } from "./upload-images";
import { validateAlbumData } from "./validate-music-data";

function arrayfyString(input: string) {
  if (input === "") {
    return null;
  }
  return input.split(",");
}

export async function AddAlbum(formData: FormData) {
  try {
    const supabase = useSupabase();
    //validate data
    const { validated, error } = validateAlbumData(formData);
    if (error) {
      throw {
        productType: "Album",
        data: null,
        error: {
          message: "Please check your inputs and try again.",
          code: 400,
        },
      };
    }

    //upload album cover
    const imageUrl = await uploadImages(
      [formData.get("cover") as File],
      "music-cover-images",
    );

    if (validated) {
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
        console.log(response.error);
        throw response.error;
      }
      console.log(response);
      return response;
    }
    //return response
    return "End of add album";
  } catch (error) {
    console.log(error);
    throw error;
  }
}
