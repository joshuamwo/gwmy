export const dynamic = "force-dynamic";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const json = await request.json();
    console.log(json);
    // Process the payload

    const result_code = json.Body.stkCallback.ResultCode;
    if (result_code !== 0) {
      // If the result code is not 0, there was an error
      const error_message = json.Body.stkCallback.ResultDesc;
      const response_data = {
        ResultCode: result_code,
        ResultDesc: error_message,
      };
      return NextResponse.json(response_data);
    }

    //validate request
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) return new Response("Unauthorised", { status: 400 });

    //get user's cart
    // const { data, error } = await supabase
    //   .from("orders")
    //   .select()
    //   .eq("user_id", user_id);

    // If the result code is 0, the transaction was completed
    const body = json.Body.stkCallback.CallbackMetadata;

    // Get amount
    const amountObj = body.Item.find((obj: any) => obj.Name === "Amount");
    const amount = amountObj.Value;

    // Get Mpesa code
    const codeObj = body.Item.find(
      (obj: any) => obj.Name === "MpesaReceiptNumber",
    );
    const mpesaCode = codeObj.Value;

    // Get phone number
    const phoneNumberObj = body.Item.find(
      (obj: any) => obj.Name === "PhoneNumber",
    );
    const phone = phoneNumberObj.Value;

    //save transaction to database
    const { data, error } = await supabase.from("transactions").insert({
      amount,
      mpesaCode,
      phone,
    });

    const cart = await supabase.from("");
  } catch (error: any) {
    console.log(error);
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!");
}
