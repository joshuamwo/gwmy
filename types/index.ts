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
  productName: string;
  price: number;
  productDescription: string;
  productImageLinks?: string[];
}

export interface Product {
  id: number;
  category: string;
  sub_category: string;
  product_name: string;
  product_description: string;
  price: number;
  is_product_varied: boolean;
  product_variations: Record<string, any>; // Change 'any' to the specific structure if known
  is_price_varied: boolean;
  price_per_variations: Record<string, any>; // Change 'any' to the specific structure if known
  stock_quantity: number;
  meta_title: string;
  meta_description: string;
  keywords: Record<string, any>; // Change 'any' to the specific structure if known
  discount_percentage: number;
  weight: number;
  dimensions: Record<string, any>; // Change 'any' to the specific structure if known
  shipping_class: string;
  created_at: Date;
  updated_at: Date;
  average_rating: number;
  total_reviews: number;
  is_published: boolean;
  owner: string; // Assuming 'owner' is a string representation of user ID (UUID)
  image_urls: string[]; // Array of image URLs
}

//can take null	or Product
export type ProductList = Product[] | null;
