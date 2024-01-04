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
  category: string;
  sub_category: string;
  product_name: string;
  price: number;
  product_variations: {};
  product_description: string;
  image_urls?: string[];
  is_published: boolean;
  is_product_varied: boolean;
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

//can take null	or Product
export type ProductList = Product[] | null;

export type ProductCategoryType = "Wardrobe" | "Music" | "Event";

export interface ProductVariationType {
  variation: string;
  price: number | null;
}

export interface CartItem {
  id: string;
  quantity: number;
  variants: Variant[];
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
