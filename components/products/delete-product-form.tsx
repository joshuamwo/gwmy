// "use client";

import { useModalState } from "../modals/modal-controller";
import { FormBgPattern } from "../auth/form-bg-pattern";
import Button from "../ui/button";
import { Container } from "@mui/material";
import { Product } from "@/types";
import { useModalAction } from "../modals/modal-controller";
import { useSupabase } from "@/context/supabase-context";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "@/recoil/atoms";

export default function DeleteProductForm() {
  //get the product from the modal state
  const { data } = useModalState();
  const product = data as Product;
  const { closeModal } = useModalAction();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useRecoilState(productState);

  const { supabase } = useSupabase();

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;
    if (data) {
      const products = data as Product[];
      setProducts(products);
    }
  }

  async function deleteImages() {
    //delete images
    let fileNames: string[] = [];
    product.image_urls.forEach((url) => {
      const parts = url.split("/");
      const fileName = parts[parts.length - 1];
      fileNames.push(fileName);
    });

    const { error } = await supabase.storage
      .from("product-images")
      .remove(fileNames);
    if (error) throw error;
    return;
  }

  async function handleDeleteProduct() {
    setLoading(true);
    deleteImages().then(async () => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;

      await fetchProducts();
      setLoading(false);
      closeModal();
      return;
    });
  }

  return (
    <Container className="relative bg-light dark:bg-dark-300 px-14 pb-12 pt-20">
      <FormBgPattern className="hidden pointer-events-none xs:flex absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
          Are you sure you want to delete {product.product_name}?{" "}
        </h2>

        {/* button */}

        <div className="flex flex-row gap-8 justify-center">
          <Button
            variant="solidDanger"
            className="w-20 h-10"
            onClick={handleDeleteProduct}
            isLoading={loading}
          >
            {!loading && "Yes"}
          </Button>
          <Button className="w-20 h-10" onClick={() => closeModal()}>
            No
          </Button>
        </div>
      </div>
    </Container>
  );
}
