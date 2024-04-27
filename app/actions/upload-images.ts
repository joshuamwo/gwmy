"use server";
import { SupabaseServer } from "./supabase-server";
import resizeImage from "@/lib/resize-image";
import { v4 as uuidv4 } from "uuid";

export async function uploadImages(images: File[], bucket: string) {
  try {
    const supabase = SupabaseServer();
    // Exit if there are no images to process
    if (images.length < 1) return;

    // This will hold the URLs of the uploaded images
    let imageUrls: string[] = [];

    // Upload each image to the storage
    const promises = images.map(async (image) => {
      // const filePath = `${filePathPrefix}/${image.name}`;
      const fileName = `${uuidv4()}`;
      const { error, data } = await supabase.storage
        .from(`${bucket}`)
        .upload(`/${fileName}`, image);
      if (error) {
        throw error;
      }
      // Store the URL of the uploaded image for later use
      imageUrls.push(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`,
      );
    });

    // Wait for all the images to be uploaded
    await Promise.all(promises);

    // Return the URLs of the uploaded images
    return imageUrls;
  } catch (error) {
    throw error;
  }
}
