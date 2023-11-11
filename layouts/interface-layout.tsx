"use client";

import dynamic from "next/dynamic";
import Header from "@/components/sections/header";
import Sidebar from "@/components/sections/sidebar";
import { useState } from "react";
import { ModalContainer } from "@/components/modals/modals-container";
import { userState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

const BottomNavigation = dynamic(
  () => import("@/components/sections/bottom-navigation")
);

export default function InterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const sidebarToggle = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const user = useRecoilValue(userState);
  const isUserLoggedIn: boolean = !user?.id === undefined;

  return (
    <>
      <div className="flex flex-col min-h-screen w-full  bg-light-300 dark:bg-dark-100 ">
        <Header
          sidebarIsOpen={sidebarIsOpen}
          sidebarToggle={sidebarToggle}
          isUserLoggedIn={isUserLoggedIn}
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
    </>
  );
}
