import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const text = await req.text();
    console.log("text:", text);

    const json = await req.json();
    console.log("json:", json);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "payment request received" });
}
