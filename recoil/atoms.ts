import { atom } from "recoil";
import { FashionProduct, UserStateType } from "@/types";
import { RecoilState } from "recoil";
import { Product } from "@/types";
import { Drawer } from "@/types";

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

export const myFashionProductsState: RecoilState<FashionProduct[]> = atom<FashionProduct[]>({
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

export const drawerState: RecoilState<Drawer> = atom<Drawer>({
	key: "draweState",
	default: {
		drawerType: "CART_VIEW",
			isOpen: false,
		}
});
