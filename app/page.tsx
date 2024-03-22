"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  router.push("/music");
  useEffect(() => {
    router.push("/music");
  });
  return <></>;
}
