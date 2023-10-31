import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";
const figtree = Figtree({ subsets: ["latin"] });

import MyRootLayout from "@/layouts/my-root-layout";

export const metadata: Metadata = {
  title: "GWMY",
  description: "God Wants Me Young",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <MyRootLayout>{children}</MyRootLayout>
      </body>
    </html>
  );
}
