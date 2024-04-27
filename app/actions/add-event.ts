"use server";

import { eventSchema } from "@/zod-schemas";
import { uploadImages } from "./upload-images";
import { SupabaseServer } from "./supabase-server";

type PrevState = {
  ok?: boolean;
  error?: string;
  status?: number;
};

export async function addEvent(
  prevState: PrevState,
  formData: FormData,
): Promise<PrevState> {
  try {
    //validate formData
    const validated = eventSchema.parse({
      name: formData.get("event_name"),
      price: formData.get("price"),
      description: formData.get("description"),
      cover: formData.get("cover"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      start_time: formData.get("start_time"),
      end_time: formData.get("end_time"),
      venue: formData.get("venue"),
      location: formData.get("location"),
      host: formData.get("host"),
      expiry_data_time: formData.get("expiry_date_time"),
      categories: formData.get("categories"),
    });

    //upload	image
    const imageUrl = await uploadImages(
      [formData.get("cover") as File],
      "events-media",
    );

    if (!imageUrl) {
      return {
        ok: false,
        error: "image upload failed",
        status: 500,
      };
    }

    //add event
    const supabase = SupabaseServer();

    const categories = validated.categories.split(",");
    let tags: string[] = [];
    //get tags from categories, name, venue, location, host
    tags = tags.concat(
      validated.categories.split(","),
      validated.name.split(" "),
      validated.venue.split(" "),
      validated.location.split(" "),
      validated.host.split(" "),
    );

    console.log("tags", tags);

    const { data, error } = await supabase.from("events").insert([
      {
        name: validated.name,
        price: validated.price,
        description: validated.description,
        cover: imageUrl[0],
        start_date: validated.start_date,
        end_date: validated.end_date,
        start_time: validated.start_time,
        end_time: validated.end_time,
        venue: validated.venue,
        location: validated.location,
        host: validated.host,
        expiry_data_time: validated.expiry_data_time,
        active: true,
        categories: categories,
        tags: tags,
      },
    ]);

    if (error) {
      console.log(error);
      return {
        ok: false,
        error: "insert failed",
        status: 500,
      };
    }

    console.log(data);

    return {
      ok: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "general",
      status: 500,
    };
  }
}
