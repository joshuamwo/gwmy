"use client";

import { useTheme } from "next-themes";
import { ThemeProvider } from "@/lib/theme-provider";
import { useEffect, useState } from "react";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This is to prevent server-side & client-side rendering mismatch
  useEffect(() => {
    setMounted(true);
    console.log(theme);
  }, [theme]);
  if (!mounted) {
    return null;
  }

  return (
    <>
      <div>HelLo</div>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
      <div>World</div>
    </>
  );
}
