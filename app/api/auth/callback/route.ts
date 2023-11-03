// Import necessary modules and types
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Define an asynchronous GET function to handle GET requests
export async function GET(request: Request) {
  // Extract the 'code' and 'next' parameters from the request URL's search parameters
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  // If a 'code' is present, proceed with the authentication process
  if (code) {
    // Create a cookie store
    const cookieStore = cookies();

    // Create a Supabase client with the Supabase URL and anonymous key from the environment variables
    // and a custom cookie management configuration
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    console.log(cookieStore);

    // Exchange the 'code' for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    // If there's no error in exchanging the code for a session, redirect the user to the 'next' URL
    if (!error) {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, request.url));
    }
  }

  // If there's an error in exchanging the code for a session, or if a 'code' is not present,
  // redirect the user to an error page at '/auth/auth-code-error'
  return NextResponse.redirect(new URL("/auth/auth-code-error", request.url));
}
