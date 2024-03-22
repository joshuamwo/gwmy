import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("req", req);
  const request = await req.json();
  // const requestT = await req.text();
  console.log("request", request);
  // console.log("requestT", requestT);

  const body = await req.body;
  console.log("body:", body);

  return NextResponse.json({ message: "payment request received" });
}
export async function GET(req: Request) {
  console.log("req", req);
  const request = await req.json();
  const requestT = await req.text();
  console.log("request", request);
  console.log("requestT", requestT);

  const body = await req.body;
  console.log("body:", body);

  return NextResponse.json({ message: "payment request received" });
}
