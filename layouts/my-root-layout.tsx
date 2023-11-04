"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/lib/theme-provider";
import Header from "@/components/sections/header";
import Sidebar from "@/components/sections/sidebar";
import { classnames } from "@/utils/classnames";
import { useState } from "react";
import { SupabaseProvider } from "@/context/supabase-context";
import { ModalContainer } from "@/components/modals/modals-container";
import { ModalProvider } from "@/components/modals/modal-controller";
import Button from "@/components/ui/button";

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
    <SupabaseProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModalProvider>
          <div className="flex flex-col min-h-screen w-full  bg-light-300 dark:bg-dark-100 ">
            <Header
              sidebarIsOpen={sidebarIsOpen}
              sidebarToggle={sidebarToggle}
            />
            <div className="flex flex-1">
              <Sidebar sidebarIsOpen={sidebarIsOpen} />
              <main
                style={{}}
                className={`flex w-full flex-col ${
                  sidebarIsOpen
                    ? "main-content-sidebar-open"
                    : "main-content-sidebar-closed"
                }`}
              >
                {children}
              </main>
            </div>
            <BottomNavigation />
          </div>
          <ModalContainer />
        </ModalProvider>
      </ThemeProvider>
    </SupabaseProvider>
  );
}
