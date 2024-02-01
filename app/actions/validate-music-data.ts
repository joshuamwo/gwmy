import { ZodError, z } from "zod";

export function validateMusicData(formData: FormData): {
  validated: any;
  error: any;
} {
  try {
    const productType = z.string().parse(formData.get("productType"));

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
      error: error,
    };
  }
}
