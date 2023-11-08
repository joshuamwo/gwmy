"use client";

import Button from "@/components/ui/button";
import { useSupabase } from "@/context/supabase-context";
import { useModalAction } from "@/components/modals/modal-controller";

export default async function App() {
  const { supabase } = useSupabase();
  const { openModal, closeModal } = useModalAction();

  const { data } = await supabase.from("profiles").select("*");

  return (
    <div className="gap-2 app-category-filter-bar sticky top-16 z-20 flex min-h-[64px] w-full overflow-hidden border-b border-light-400 bg-light-100 px-4 py-4 dark:border-dark-300 dark:bg-dark-100 sm:top-[70px] sm:min-h-[70px] sm:px-5 sm:py-5 md:px-6 lg:px-7 3xl:px-8">
      <h1>Main Content Goes Here</h1>
      <div className="flex flex-col gap-4 w-full">
        <Button className="w-32" onClick={() => openModal("SIGNUP")}>
          Sign Up
        </Button>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </div>
  );
}
