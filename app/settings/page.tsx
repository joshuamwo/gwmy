"use client";

import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";

export default function Setting() {
  const user = useRecoilValue(userState);

  return <div>{user !== null && <pre>{`Hello ${user.full_name} `}</pre>}</div>;
}
