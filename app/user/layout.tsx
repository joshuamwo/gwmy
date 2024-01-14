"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useModalAction } from "@/components/modals/modal-controller";
import { UserStateType } from "@/types";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

export default function UserLayout({ children }: { children: ReactNode }) {
  const user = useRecoilValue<UserStateType | null>(userState);
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
