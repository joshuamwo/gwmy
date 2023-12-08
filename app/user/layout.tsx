"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useModalAction } from "@/components/modals/modal-controller";
import { UserStateType } from "@/types";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";

export default function UserLayout({ children }: { children: ReactNode }) {
  const user = useRecoilValue<UserStateType | null>(userState);
  const { openModal } = useModalAction();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      openModal("AUTHFORM");
    }
  }, [user]);

  return <>{user && children}</>;
}
