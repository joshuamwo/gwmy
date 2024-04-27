import { z } from "zod";

export const albumSchema = z.object({
  // productType: z.string(),
  name: z.string(),
  artist_name: z.string(),
  artist_id: z.string(),
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
  artist_name: z.string(),
  artist_id: z.string(),
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
  artist_name: z.string(),
  artist_id: z.string(),
  price: z.coerce.number(),
  genre: z.string(),
  other_artists: z.string(),
  producers: z.string(),
  artists_note: z.string(),
  cover: z.any(),
  track: z.any(),
  is_published: z.string(),
});

export const artistSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  alias: z.string(),
  id_number: z.string(),
  phone_number: z.string(),
  profile_picture: z.any(),
  recording_label: z.string(),
});

export const eventSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  cover: z.any(),
  start_date: z.string(),
  end_date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  venue: z.string(),
  location: z.string(),
  host: z.string(),
	expiry_data_time: z.string(),
		categories: z.string(),
});
