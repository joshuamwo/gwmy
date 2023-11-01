"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/lib/theme-provider";
import Header from "@/components/sections/header";
import Sidebar from "@/components/sections/sidebar";
import { classnames } from "@/utils/classnames";
import { useState } from "react";

const BottomNavigation = dynamic(
  () => import("@/components/sections/bottom-navigation")
);

export default function MyRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const sidebarToggle = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen w-full flex-col bg-light-300 dark:bg-dark-100 ">
        <Header sidebarIsOpen={sidebarIsOpen} sidebarToggle={sidebarToggle} />
        <div className="flex flex-1">
          <Sidebar sidebarIsOpen={sidebarIsOpen} />
          <main
            className={classnames(
              "flex w-full flex-col",
              sidebarIsOpen
                ? "ltr:sm:pl-[75px] rtl:sm:pr-[75px] ltr:xl:pl-60 rtl:xl:pr-60"
                : "ltr:sm:pl-60 rtl:sm:pr-60 ltr:xl:pl-[75px] rtl:xl:pr-[75px]"
            )}
          >
            {children}
          </main>
        </div>
        <BottomNavigation />
      </div>
    </ThemeProvider>
  );
}
