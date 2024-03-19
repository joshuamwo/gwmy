"use server";

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
  console.log(formData.get("number"));
  console.log(formData.get("cart"));
  console.log(formData.get("total"));

  return {
    ok: true,
    error: null,
    code: 200,
  };
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
      PhoneNumber: 254742092240,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "GWMY",
      TransactionDesc: "Music",
    }),
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}
