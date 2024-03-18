import { ZodError, z } from "zod";
//schemas
import {
  albumSchema,
  singleTrackSchema,
  albumTrackSchema,
  artistSchema,
} from "@/zod-schemas";

type Album = z.infer<typeof albumSchema>;
type AlbumTrack = z.infer<typeof albumTrackSchema>;
type SingleTrack = z.infer<typeof singleTrackSchema>;
type Artist = z.infer<typeof artistSchema>;

interface ValidationResult {
  validated: Album | AlbumTrack | SingleTrack | null;
  error: ZodError | { message: string } | null;
}

export function validateMusicData(formData: FormData): ValidationResult {
  try {
    const productType = z.string().parse(formData.get("productType"));

    //Validate data

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
      return {
        validated: data,
        error: null,
      };
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
        return {
          validated: data,
          error: null,
        };
      } else {
        const data = albumTrackSchema.parse({
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
        return {
          validated: data,
          error: null,
        };
      }
    }

    return {
      validated: null,
      error: {
        message: "Product Type is not supported.",
      },
    };
  } catch (error) {
    return {
      validated: null,
      error: error as ZodError,
    };
  }
}

//album

export function validateAlbumData(formData: FormData): {
  validated: Album | null;
  error: ZodError | { message: string } | null;
} {
  try {
    //Validate data
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
    return {
      validated: data,
      error: null,
    };
  } catch (error) {
    return {
      validated: null,
      error: error as ZodError,
    };
  }
}

//single track
export function validateSingleTrackData(formData: FormData): {
  validated: SingleTrack | null;
  error: ZodError | { message: string } | null;
} {
  try {
    //Validate data
    const data = singleTrackSchema.parse({
      name: formData.get("name"),
      artist: formData.get("artist"),
      price: formData.get("price"),
      genre: formData.get("genre"),
      cover: formData.get("cover"),
      track: formData.get("track"),
      other_artists: formData.get("other_artists"),
      producers: formData.get("producers"),
      artists_note: formData.get("artists_note"),
      is_published: formData.get("is_published"),
    });
    return {
      validated: data,
      error: null,
    };
  } catch (error) {
    return {
      validated: null,
      error: error as ZodError,
    };
  }
}

//album track
export function validateAlbumTrackData(formData: FormData): {
  validated: AlbumTrack | null;
  error: ZodError | { message: string } | null;
} {
  try {
    //Validate data
    const data = albumTrackSchema.parse({
      name: formData.get("name"),
      artist: formData.get("artist"),
      price: formData.get("price"),
      album: formData.get("album"),
      genre: formData.get("genre"),
      track: formData.get("track"),
      other_artists: formData.get("other_artists"),
      producers: formData.get("producers"),
      artists_note: formData.get("artists_note"),
      is_published: formData.get("is_published"),
    });
    return {
      validated: data,
      error: null,
    };
  } catch (error) {
    return {
      validated: null,
      error: error as ZodError,
    };
  }
}

//album track
export function validateArtistData(formData: FormData): {
  validated: Artist | null;
  error: ZodError | { message: string } | null;
} {
  try {
    //Validate data
    const data = artistSchema.parse({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      alias: formData.get("alias"),
      id_number: formData.get("id_number"),
      phone_number: formData.get("phone_number"),
      profile_picture: formData.get("profile_picture"),
      recording_label: formData.get("recording_label"),
    });
    return {
      validated: data,
      error: null,
    };
  } catch (error) {
    return {
      validated: null,
      error: error as ZodError,
    };
  }
}
