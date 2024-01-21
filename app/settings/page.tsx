"use client";

import { userContext } from "@/context/supabase-context";

export default function Setting() {
  const user = userContext();

  return <div>{user && <pre>{`Hello ${user.full_name} `}</pre>}</div>;
}
