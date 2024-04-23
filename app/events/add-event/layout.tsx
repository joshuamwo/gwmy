"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useModalAction } from "@/components/modals/modal-controller";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { userContext } from "@/context/supabase-context";
import { useRecoilValue } from "recoil";
import { getUserDoneState, userState } from "@/recoil/atoms";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = useRecoilValue(userState);
  const { openModal, closeModal } = useModalAction();
  const router = useRouter();
  const isMounted = useIsMounted();
  const getUserDone = useRecoilValue(getUserDoneState);

  useEffect(() => {
    if (!getUserDone) return;
    if (!user) {
      // router.push("/");
      openModal("AUTHFORM");
    } else {
      closeModal();
    }
  }, [user, getUserDone]);

  return <>{user && children}</>;
}
