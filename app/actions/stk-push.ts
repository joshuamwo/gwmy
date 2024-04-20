"use server";

import { CartItem } from "@/types";
import axios from "axios";
import { z } from "zod";
import { SupabaseServer } from "./supabase-server";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = createClient();

  //zod validation schema
  const schema = z.object({
    cart: z.string(),
    number: z.string(),
    total: z.string(),
  });

  try {
    //user auth
    const { user } = (await supabase.auth.getUser()).data;
    if (!user?.id) {
      return {
        ok: false,
        error: {
          message: "Unauthorised",
        },
        code: 403,
      };
    }
    console.log(user);
    //validate form data

    const validated = schema.parse({
      cart: formData.get("cart"),
      number: formData.get("number"),
      total: formData.get("total"),
    });

    console.log(validated);
    const items = JSON.parse(validated.cart);

    // store items in database
    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        items,
        total: Number(validated.total),
        phone: validated.number,
      })
      .returns();

    if (error) {
      console.log(error);
      throw new Error("Failed to store items ordered in database");
    }

    console.log("order", data);

    return {
      ok: true,
      error: null,
      code: 200,
    };

    //sebd stk oush
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/mpesa/stk-push`,
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
