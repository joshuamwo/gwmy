"use client"

import { useRecoilState } from "recoil";
import { productState } from "@/recoil/atoms";
import { useSupabase } from "@/context/supabase-context";
import { Product } from "@/types";

export default async function fetchProducts() {
  const [products, setProducts] = useRecoilState(productState);
  const { supabase } = useSupabase();
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  if (data) {
    const products = data as Product[];
    setProducts(products);
  }
}
