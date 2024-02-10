import { Interface } from "readline";

export interface RegisterInput {
  email: string;
  password: string;
}

export type UserStateType = {
  id: string;
  updated_at?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  user_type?: string;
} | null;

export interface ProductInput {
  category: ProductType;
  sub_category: string;
  product_name: string;
  price: number;
  product_variations: {};
  product_description: string;
  image_urls?: string[];
  is_published: boolean;
  colors: string[];
  sizes: string[];
}

export interface FashionProductInput {
  category: string;
  sub_category: string;
  product_name: string;
  price: number;
  product_variations: {};
  product_description: string;
  image_urls?: string[];
  is_published: boolean;
  colors: string[];
  sizes: string[];
}

export interface Product {
  id: string;
  category: string;
  sub_category: string;
  product_name: string;
  product_description: string;
  price: number;
  is_product_varied: boolean;
  colors: [];
  sizes: [];
  product_variations: Record<string, ProductVariationType[]>;
  is_price_varied: boolean;
  price_per_variations: Record<string, any>;
  stock_quantity: number;
  meta_title: string;
  meta_description: string;
  keywords: Record<string, any>;
  discount_percentage: number;
  weight: number;
  dimensions: Record<string, any>;
  shipping_class: string;
  created_at: Date;
  updated_at: Date;
  average_rating: number;
  total_reviews: number;
  is_published: boolean;
  owner: string;
  image_urls: string[];
}

export interface FashionProduct {
  id: string;
  category: string;
  sub_category: string;
  product_name: string;
  product_description: string;
  price: number;
  colors: [];
  sizes: [];
  is_price_varied: boolean;
  product_variations: Record<string, ProductVariationType[]>;
  price_per_variations: Record<string, any>;
  stock_quantity: number;
  meta_title: string;
  meta_description: string;
  keywords: Record<string, any>;
  discount_percentage: number;
  weight: number;
  dimensions: Record<string, any>;
  shipping_class: string;
  created_at: Date;
  updated_at: Date;
  average_rating: number;
  total_reviews: number;
  is_published: boolean;
  owner: string;
  image_urls: string[];
}

export interface MusicProduct {
  id: string;
  type: string;
  name: string;
  artist: string;
  price: number;
  other_artists: string[];
  album: string;
  cover: string;
  artists_note: string;
  producers: string;
  release_date: Date;
  genre: string;
  meta_title: string;
  meta_description: string;
  keywords: Record<string, any>;
  discount_percentage: number;
  created_at: Date;
  updated_at: Date;
  average_rating: number;
  total_reviews: number;
  is_published: boolean;
  owner: string;
}

export interface MusicProductInput {
  type?: string | undefined;
  name?: string | undefined;
  artist?: string | undefined;
  price?: number | undefined;
  other_artists?: string[] | undefined;
  album?: string | undefined;
  cover?: File | undefined;
  artists_note?: string | undefined;
  producers?: string[] | undefined;
  release_date?: Date | undefined;
  genre?: string | undefined;
  is_published?: boolean | undefined;
  track?: File;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  tracks: string[] | null;
  cover: string;
  genre: string;
  price: number;
  other_artists: string[] | null;
  artists_note: string | null;
  producers: string[] | null;
  release_date: string | null;
  published: boolean;
  purchases: number;
  likes: number;
  owner: string;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  genre: string;
  price: number;
  cover?: string;
  album: string;
  other_artists?: string[];
  artists_note?: string;
  producers?: string[];
  release_date?: string;
  published: boolean;
  purchases: number;
  likes: number;
  owner: string;
}

export interface SingleTrack {
  id: string;
  name: string;
  artist: string;
  genre: string;
  price: number;
  cover?: string;
  other_artists?: string[];
  artists_note?: string;
  producers?: string[];
  release_date?: string;
  published: boolean;
  purchases: number;
  likes: number;
  owner: string;
}

//can take null	or Product
export type ProductList = Product[] | null;

export type ProductType = "Fashion" | "Music" | "Event";

export interface ProductVariationType {
  variation: string;
  price: number | null;
}

export interface CartItem {
  cartItemId: string;
  name: string;
  image: string;
  id: string;
  quantity: number;
  color: string;
  size: string;
  price: number;
}

export interface Item {
  id: string;
  quantity: number;
  variant: Variant;
}

export type Variant = {
  name: string;
  quantity: number;
};

export type ProductVariation = {
  color: string;
  size: string;
  quantity: string;
};

// cart context

export interface CartContext {
  cart: CartItem[];
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (item: CartItem) => void;
  decreseItemQuantity: (item: Item) => void;
  removeFromCart: (item: CartItem) => void;
  getCartTotalCount: () => number;
  getCartTotalPrice: () => number;
}

export type DrawerType = "MOBILE_MENU" | "CART_VIEW";

export interface Drawer {
  drawerType: DrawerType;
  isOpen: boolean;
}
