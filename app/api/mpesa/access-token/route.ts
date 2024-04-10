import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET(res: NextResponse) {
  const auth = new Buffer(
    `${process.env.SAF_CONSUMER_KEY}:${process.env.SAF_CONSUMER_SECRET}`,
  ).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          // "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );

    if (!response.data.access_token)
      throw new Error("Failed to get access token");

    return NextResponse.json({
      token: response.data.access_token,
      error: null,
    });
  } catch (error: any) {
    console.log(error.response.data ?? error.message);
    return NextResponse.json({
      token: null,
      error: "Failed to get access token",
    });
  }
}
