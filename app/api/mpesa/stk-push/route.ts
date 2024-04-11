import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { dateTime } from "@/utils/date-time";

export async function POST(req: NextRequest) {
  try {
    //get access token
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/mpesa/access-token`,
    );

    if (!response.data.token) throw new Error("Failed to get access token");
    const token = response.data.token;
    //set token in headers
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    //get request data
    const data = await req.json();
    const number = "254" + Number(data.number);
    const short_code = process.env.SAF_BUSINESS_SHORT_CODE ?? "";
    const pass_key = process.env.SAF_PASS_KEY ?? "";
    const timestamp = dateTime();
    const callback_url = process.env.STK_CALLBACK_URL ?? "";

    console.log(short_code, pass_key, callback_url, number);

    //generate base64 password to be used in stk push request
    const password = Buffer.from(
      `${short_code + pass_key + timestamp}`,
    ).toString("base64");

    //payment data
    const paymentData = {
      BusinessShortCode: short_code,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: "1",
      PartyA: number,
      PartyB: short_code,
      PhoneNumber: number,
      CallBackURL: callback_url,
      AccountReference: "GWMY",
      TransactionDesc: "Cart Checkout",
    };

    //send stk push request
    const stkPushRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      paymentData,
      { headers },
    );

    //failed stk push
    if (!stkPushRes.data.MerchantRequestID)
      throw new Error("Failed to send stk push request");

    console.log(stkPushRes);

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    console.log(error.response.data ?? error.message);
    return NextResponse.json({
      ok: false,
    });
  }
}
