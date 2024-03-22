"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/music");
  });
  return <div>Hi. Bye.</div>;
}
