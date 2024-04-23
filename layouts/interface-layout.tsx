"use client";

import dynamic from "next/dynamic";
import Header from "@/components/sections/header";
import Sidebar from "@/components/sections/sidebar";
import { useState } from "react";
import { ModalContainer } from "@/components/modals/modals-container";
import { getUserDoneState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import { Toaster } from "react-hot-toast";
import DrawersContainer from "@/components/drawer/drawer-container";
import { userContext } from "@/context/supabase-context";

const BottomNavigation = dynamic(
  () => import("@/components/sections/bottom-navigation"),
);

export default function InterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const sidebarToggle = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const user = userContext();
  const isUserLoggedIn: boolean = !user?.id === undefined;
  const getUserDone = useRecoilValue(getUserDoneState);

  return (
    <div className="relative flex h-screen w-full flex-col gap-1.5 p-2 ">
      <Header
        sidebarIsOpen={sidebarIsOpen}
        sidebarToggle={sidebarToggle}
        isUserLoggedIn={isUserLoggedIn}
      />
      <div className="flex flex-1 gap-2 overflow-hidden">
        <Toaster position="top-center" reverseOrder={false} />
        <Sidebar sidebarIsOpen={sidebarIsOpen} />
        <main
          className={`flex h-full w-full flex-col overflow-auto rounded-lg bg-light-400 dark:bg-dark-100`}
        >
          {children}
        </main>
      </div>
      <BottomNavigation />
      <ModalContainer />
      <DrawersContainer />
    </div>
  );
}
