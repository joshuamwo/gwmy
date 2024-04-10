"use server";

import { CartItem } from "@/types";
import axios from "axios";
import { z } from "zod";
import { SupabaseServer } from "./supabase-server";

interface prevState {
  ok: boolean | null;
  code: number | null;
  error: {
    message: string;
  } | null;
}

export async function stkPush(
  prevState: prevState,
  formData: FormData,
): Promise<prevState> {
  //get user id
  // const supabase = SupabaseServer();

  // const user = (await supabase.auth.getUser()).data;
  // if (!user) {
  //   return {
  //     ok: false,
  //     error: {
  //       message: "Unauthorised",
  //     },
  //     code: 403,
  //   };
  // }

  // console.log(user);

  // return {
  //   ok: true,
  //   error: null,
  //   code: 200,
  // };

  //zod validation schema
  const schema = z.object({
    cart: z.string(),
    number: z.string(),
    total: z.string(),
  });

  try {
    //validate form data

    const validated = schema.parse({
      cart: formData.get("cart"),
      number: formData.get("number"),
      total: formData.get("total"),
    });

    //sebd stk oush
    const response = await axios.post(
      `${process.env.SITE_URL}/api/mpesa/stk-push`,
      {
        number: validated.number,
        cart: validated.cart,
        total: validated.total,
      },
    );
    if (!response.data.ok) throw new Error("Failed to send stk push request");

    return {
      ok: true,
      error: null,
      code: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        message: " Failed. Try again later.",
      },
      code: 500,
    };
  }
}
