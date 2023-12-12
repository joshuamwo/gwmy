"use client";

import { useModalAction } from "@/components/modals/modal-controller";
import { useEffect, useState } from "react";
import { useSupabase } from "@/context/supabase-context";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  console.log(productId);
  const { openModal } = useModalAction();
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId);
    if (error) throw error;
    if (data) {
      const product = data[0];
      setProduct(product);
    }
  }

  useEffect(() => {
    if (!product) fetchProduct();
    if (product) openModal("PRODUCTVIEWMODAL", product);
  }, [product]);

  return product && <></>;
}
