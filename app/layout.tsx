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



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={classnames(figtree.className)}>
      <body className="">
        <MyRootLayout>{children}</MyRootLayout>
      </body>
    </html>
  );
}
