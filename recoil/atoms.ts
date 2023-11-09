import { atom } from "recoil";
import { User } from "@supabase/supabase-js";
import { UserStateType } from "@/types";

export const userState = atom<UserStateType>({
  key: "userState",
  default: null,
});
