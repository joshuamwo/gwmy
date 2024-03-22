"use server";

import { CartItem } from "@/types";
import { z } from "zod";

interface prevState {
  ok: boolean | null;
  code: number | null;
  error: {
    message: string;
  } | null;
}

function dateTime() {
  // Get the current date and time
  let currentDate = new Date();

  // Get the individual components
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since months are zero-based
  let day = String(currentDate.getDate()).padStart(2, "0");
  let hours = String(currentDate.getHours()).padStart(2, "0");
  let minutes = String(currentDate.getMinutes()).padStart(2, "0");
  let seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Concatenate the components
  let formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

  //return formatted date
  return formattedDate;
}

export async function stkPush(
  prevState: prevState,
  formData: FormData,
): Promise<prevState> {
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

    const number = "254" + Number(validated.number);
    console.log("number:", number);
    const cart = JSON.parse(validated.cart) as CartItem[];

    //saf api constants
    const short_code = process.env.SAF_BUSINESS_SHORT_CODE ?? "";
    const pass_key = process.env.SAF_PASS_KEY ?? "";
    const consumer_key = process.env.SAF_CONSUMER_KEY ?? "";
    const consumer_secret = process.env.SAF_CONSUMER_SECRET ?? "";
    const timestamp = dateTime();

    //generate base64 auth key to be used to get auth token from	safaricom
    const authBearer = Buffer.from(
      `${consumer_key}:${consumer_secret}`,
    ).toString("base64");

    //generate base64 password to be used in stk push request
    const password = Buffer.from(
      `${short_code + pass_key + timestamp}`,
    ).toString("base64");

    console.log("password:", password);
    // console.log("password:", password);

    //get access bearer token for Mpesa express
    //define headers
    let authBearerHeaders = new Headers();
    authBearerHeaders.append("Authorization", `Basic ${authBearer}`);
    const response = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: authBearerHeaders },
    )
      .then(async (response) => {
        const res = await response.text();
        if (res === "no healthy upstream")
          return {
            ok: false,
            message: "failed to get access token, no healthy upstream",
          };
        const accessToken = JSON.parse(res).access_token;

        console.log("access token:", accessToken);

        if (!accessToken)
          return {
            ok: false,
            message: "error	getting access token",
          };
        //stk push
        //send payment request
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${accessToken}`);

        const stkPushRes: {
          ok: boolean;
          message: string;
        } = await fetch(
          "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              BusinessShortCode: 174379,
              Password: password,
              Timestamp: timestamp,
              TransactionType: "CustomerPayBillOnline",
              Amount: "1",
              PartyA: number,
              PartyB: short_code,
              PhoneNumber: number,
              CallBackURL:
                "https://181e-105-163-156-33.ngrok-free.app/payment-request-callback",
              AccountReference: "GWMY",
              TransactionDesc: "Music",
            }),
          },
        )
          .then(async (response) => {
            const res = await response.text();
            console.log("stk push response:", res);
            return {
              ok: true,
              message: "payment request sent",
            };
          })
          .catch((error) => {
            console.error("stk push error", error);
            return {
              ok: false,
              message: "error sending payment request",
            };
            // throw error;
          });

        console.log("stk push response:", stkPushRes);
        return stkPushRes;
      })
      .catch((error) => {
        console.error("access token error", error);
        return {
          ok: false,
          message: "error getting access token",
        };
      });

    if (!response.ok) {
      console.error("stkPushError:", response.message);
      return {
        ok: false,
        error: {
          message: "Failed to send	payment request. Try again later.",
        },
        code: 500,
      };
    }

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

  let authHeaders = new Headers();
  authHeaders.append(
    "Authorization",
    "Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==",
  );
  fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: authHeaders },
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer gROaLH3z7BLrU6sGwmvVCNyu585f");
  fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers,
    body: JSON.stringify({
      BusinessShortCode: 174379,
      Password:
        "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMzE5MTEzOTA1",
      Timestamp: "20240319113905",
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: 254708374149,
      PartyB: 174379,
      PhonezodNumber: 254742092240,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "GWMY",
      TransactionDesc: "Music",
    }),
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}
