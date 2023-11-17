import { atom } from "recoil";
import { UserStateType } from "@/types";
import { RecoilState } from "recoil";

export const userState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "userState",
  default: null,
});
