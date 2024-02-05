"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useModalAction } from "@/components/modals/modal-controller";
import { useRecoilValue } from "recoil";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { getUserDoneState, userState } from "@/recoil/atoms";
import { modalIsOpenState } from "@/recoil/atoms";
import { userContext } from "@/context/supabase-context";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = useRecoilValue(userState);
  const { openModal } = useModalAction();
  const router = useRouter();
  const isMounted = useIsMounted();
  const getUserDone = useRecoilValue(getUserDoneState);
  const modalIsOpen = useRecoilValue(modalIsOpenState);

  useEffect(() => {
    if (modalIsOpen) return;
    if (!getUserDone) return;
    if (!user) {
      router.push("/");
      openModal("AUTHFORM");
    } else if (user.user_type !== "alpha") {
      router.push("/");
    }
  }, [modalIsOpen, getUserDone, openModal, router, user]);

  return <>{user && user.user_type == "alpha" && children}</>;
}
