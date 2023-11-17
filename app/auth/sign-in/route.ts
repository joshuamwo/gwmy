import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${requestUrl.origin}`,
      },
    });
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  });
}
