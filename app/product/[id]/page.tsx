"use client";

import {
  useModalAction,
  useModalState,
} from "@/components/modals/modal-controller";
import { useEffect, useState } from "react";
import { useSupabase } from "@/context/supabase-context";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  console.log(productId);
  const { openModal, closeModal } = useModalAction();
  const { view, isOpen, data } = useModalState();
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);

  //
  const router = useRouter();

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

  useEffect(() => {
    if (!product) return;
    if (isOpen) return;
    console.log(isOpen);
    router.back();
  }, [isOpen]);

  return product && <></>;
}
