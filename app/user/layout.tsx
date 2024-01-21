"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useModalAction } from "@/components/modals/modal-controller";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { userContext } from "@/context/supabase-context";

export default function UserLayout({ children }: { children: ReactNode }) {
  const user = userContext();
  const { openModal } = useModalAction();
  const router = useRouter();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) return;
    if (!user) {
      router.push("/");
      openModal("AUTHFORM");
    }
  }, [user, isMounted]);

  return <>{user && children}</>;
}
