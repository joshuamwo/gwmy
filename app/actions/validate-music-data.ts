import { ZodError, z } from "zod";
//schemas
import { albumSchema, singleTrackSchema, trackSchema } from "@/zod-schemas";

type Album = z.infer<typeof albumSchema>;
type Track = z.infer<typeof trackSchema>;
type SingleTrack = z.infer<typeof singleTrackSchema>;

interface ValidationResult {
  validated: Album | Track | SingleTrack | null;
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

export function validateTrackData(formData: FormData): ValidationResult {
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
