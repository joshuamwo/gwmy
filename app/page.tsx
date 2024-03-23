"use client";

import { SpinnerIcon } from "@/components/icons/spinner-icon";
import { getUserDoneState, userState } from "@/recoil/atoms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function HomePage() {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const getUserDone = useRecoilValue(getUserDoneState);
  useEffect(() => {
    if (!getUserDone) return;
    if (user && user.user_type === "alpha") router.push("/admin/my-music");
    else router.push("/music");
  }, [user, getUserDone]);
  return (
    <>
      {user && (
        <div className="flex h-full w-full items-center justify-center">
          <SpinnerIcon className="h-16 w-16 animate-spin text-brand" />
        </div>
      )}
    </>
  );
}
