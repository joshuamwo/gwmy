"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

interface ImageUploadProps {
  folder: string;
  files: File[] | File;
}

export async function AddMusic(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    },
  );

  const imageData = await formData.get("cover");

  if (imageData instanceof File) {
    console.log(imageData.name);
  }

  console.log("test ", formData, prevState);

  return { message: "Ok" };
}
