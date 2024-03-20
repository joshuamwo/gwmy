import { atom } from "recoil";
import {
  Album,
  Artist,
  FashionProduct,
  SingleTrack,
  Track,
  UserStateType,
} from "@/types";
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

export const myFashionProductsState: RecoilState<FashionProduct[]> = atom<
  FashionProduct[]
>({
  key: "myFashionProductsState",
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
  },
});

export const myAlbumsState: RecoilState<Album[]> = atom<Album[]>({
  key: "myAlbumsState",
  default: [],
});

export const albumsState: RecoilState<Album[]> = atom<Album[]>({
  key: "albumsState",
  default: [],
});

export const tracksState: RecoilState<Track[]> = atom<Track[]>({
  key: "tracksState",
  default: [],
});

export const mySingleTracksState: RecoilState<SingleTrack[]> = atom<
  SingleTrack[]
>({
  key: "mySingleTracksState",
  default: [],
});

export const artistsState: RecoilState<Artist[]> = atom<Artist[]>({
  key: "artistsState",
  default: [],
});
