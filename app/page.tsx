"use client";

import { createBrowserClient } from "@supabase/ssr";
import Button from "@/components/ui/button";
import { useSupabase } from "@/context/supabase-context";
import { ModalContainer } from "@/components/modals/modals-container";
import { useState } from "react";
import { useModalAction } from "@/components/modals/modal-controller";

export default function App() {
  const { supabase } = useSupabase();

  const signIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "yulluson@gmail.com",
      password: "12345six",
    });
    // .signInWithOAuth({
    //   provider,
    //   options: {
    //     redirectTo: `http://localhost:3000/api/auth/callback`,
    //     queryParams: {
    //       access_type: "offline",
    //       prompt: "consent",
    //     },
    //   },
    // });
  };
  const signUp = async () => {
    await supabase.auth.signUp({
      email: "yulluson@gmail.com",
      password: "12345six",
    });
    // .signInWithOAuth({
    //   provider,
    //   options: {
    //     redirectTo: `http://localhost:3000/api/auth/callback`,
    //     queryParams: {
    //       access_type: "offline",
    //       prompt: "consent",
    //     },
    //   },
    // });
  };
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  //state for testing the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  type modalToggleProps = "open" | "close";
  const modalToggle = (action: modalToggleProps) => {
    switch (action) {
      case "open":
        setModalIsOpen(true);
        console.log("Modal Open ? : ", modalIsOpen);
        break;
      case "close":
        setModalIsOpen(false);
        console.log("Modal Open ? : ", modalIsOpen);

        break;
      default:
        break;
    }
  };

  const { openModal, closeModal } = useModalAction();

  return (
    <div className="gap-2 app-category-filter-bar sticky top-16 z-20 flex min-h-[64px] w-full overflow-hidden border-b border-light-400 bg-light-100 px-4 py-4 dark:border-dark-300 dark:bg-dark-100 sm:top-[70px] sm:min-h-[70px] sm:px-5 sm:py-5 md:px-6 lg:px-7 3xl:px-8">
      <h1>Main Content Goes Here</h1>
      <div className="flex flex-col gap-4 w-full">
        <Button className="w-32" onClick={() => openModal("SIGNUP")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
