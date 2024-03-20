"use server";

import { CartItem } from "@/types";
import { z } from "zod";
const unirest = require("unirest");

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

    const number = Number("254" + Number(validated.number));

    const cart = JSON.parse(validated.cart) as CartItem[];

    //get auth token
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

    return {
      ok: true,
      error: null,
      code: 200,
    };

    //send payment request
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer gROaLH3z7BLrU6sGwmvVCNyu585f");
    await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          BusinessShortCode: 174379,
          Password:
            "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMzE5MTEzOTA1",
          Timestamp: dateTime(),
          TransactionType: "CustomerPayBillOnline",
          Amount: 1,
          PartyA: number,
          PartyB: 174379,
          PhonezodNumber: number,
          CallBackURL:
            "https://181e-105-163-156-33.ngrok-free.app/payment-request-callback",
          AccountReference: "GWMY",
          TransactionDesc: "Music",
        }),
      },
    )
      .then(async (response) => {
        return response.text();
      })
      .then((result) => {
        console.log("result", result);
        // return result;
      })
      .catch((error) => {
        console.log("error", error);
        throw error;
      });

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

  // let headers = new Headers();
  // headers.append(
  //   "Authorization",
  //   "Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==",
  // );
  // fetch(
  //   "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
  //   { headers },
  // )
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

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
