import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const figtree = Inter({ subsets: ["latin"] });
import { classnames } from "@/utils/classnames";

import MyRootLayout from "@/layouts/my-root-layout";

export const metadata: Metadata = {
  title: "nunc entertainment",
  description: "Your one stop shop for everything entertainment.",
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
