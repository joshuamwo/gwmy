import { atom } from "recoil";
import { UserStateType } from "@/types";
import { RecoilState } from "recoil";
import { ProductList } from "@/types";

export const userState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "userState",
  default: null,
});

export const productState: RecoilState<ProductList[]> = atom<ProductList[]>({
  key: "ProductState",
  default: [],
});
