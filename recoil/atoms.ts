import { atom } from "recoil";
import { UserStateType } from "@/types";
import { RecoilState } from "recoil";
import { Product } from "@/types";

export const userState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "userState",
  default: null,
});

export const productsState: RecoilState<Product[]> = atom<Product[]>({
  key: "ProductsState",
  default: [],
});

export const myProductsState: RecoilState<Product[]> = atom<Product[]>({
  key: "myProductsState",
  default: [],
});

export const getUserDoneState: RecoilState<boolean> = atom<boolean>({
  key: "getUserDoneState",
  default: false,
});

export const modalIsOpenState: RecoilState<boolean> = atom<boolean>({
  key: "modalIsOpenState",
  default: false,
});
