import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";
const figtree = Figtree({ subsets: ["latin"] });
import { classnames } from "@/utils/classnames";

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
    <html lang="en" className={figtree.className}>
      <body>
        <MyRootLayout>{children}</MyRootLayout>
      </body>
    </html>
  );
}
