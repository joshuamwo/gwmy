import axios from "axios";

export async function getMpesaAccessToken(): Promise<{
  access_token: string | null;
  error: {
    message: string;
  } | null;
}> {
  const consumer_key = process.env.NEXT_PUBLIC_SAF_CONSUMER_KEY! ?? "";
  const consumer_secret = process.env.NEXT_PUBLIC_SAF_CONSUMER_SECRET! ?? "";

  //ensure	consumer key and secret are not empty
  if (consumer_key === "" || consumer_secret === "") {
    return {
      access_token: null,
      error: {
        message: "consumer key or secret is missing",
      },
    };
  }

  //encode consumer key and secret
  // const authBearer = Buffer.from(`${consumer_key}:${consumer_secret}`).toString(
  //   "base64",
  // );

  const authBearer =
    "b2c2WkhoaGg4c05vUUNBQTcxWU9RR2UyeDFmZWdhTkpOTXdlT0Exbko0RU1RbTNOOlBHMmtrRzYzbGRuRHBnT2hUZ3pUUkMzYlRTQUFyMklYdEpwb0hBZ2VJaU43Nkt3aHg5WE1meVpLdHdISjdDZWk=";

  //append auth bearer to headers
  let headers = new Headers();
  headers.append("Authorization", `Basic ${authBearer}`);

  //declare response
  let response: Response;

  //send request to get access token
  try {
    response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authBearer}`,
          timeout: 8000,
        },
      },
    );
  } catch (error) {
    console.error("error caught:");
    return {
      access_token: null,
      error: {
        message: "caught an error while getting access token",
      },
    };
  }

  //parse response
  if (response) {
    console.log("res:", response.text());
    return {
      access_token: "",
      error: null,
    };
  } else {
    return {
      access_token: null,
      error: {
        message: "no response from safaricom",
      },
    };
  }
}
