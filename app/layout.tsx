import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <MyRootLayout>{children}</MyRootLayout>
      </body>
    </html>
  );
}
