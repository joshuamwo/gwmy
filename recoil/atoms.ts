import { atom } from "recoil";
import { UserStateType } from "@/types";
import { RecoilState } from "recoil";
import { Product } from "@/types";

export const userState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "userState",
  default: null,
});

export const productState: RecoilState<Product[]> = atom<Product[]>({
  key: "ProductState",
  default: [],
});


export const myProductsState: RecoilState<Product[]> = atom<Product[]>({
  key: "myProductsState",
  default: [],
});
