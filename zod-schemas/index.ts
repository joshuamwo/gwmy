import { z } from "zod";

export const albumSchema = z.object({
  // productType: z.string(),
  name: z.string(),
  artist: z.string(),
  price: z.coerce.number(),
  genre: z.string(),
  cover: z.any(),
  other_artists: z.string(),
  producers: z.string(),
  artists_note: z.string(),
});

export const albumTrackSchema = z.object({
  // productType: z.string(),
  name: z.string(),
  artist: z.string(),
  price: z.coerce.number(),
  genre: z.string(),
  album: z.string(),
  other_artists: z.string(),
  producers: z.string(),
  artists_note: z.string(),
  track: z.any(),
  is_published: z.string(),
});
export const singleTrackSchema = z.object({
  // productType: z.string(),
  name: z.string(),
  artist: z.string(),
  price: z.coerce.number(),
  genre: z.string(),
  other_artists: z.string(),
  producers: z.string(),
  artists_note: z.string(),
  cover: z.any(),
  track: z.any(),
  is_published: z.string(),
});
