// "use client";

import { useModalState } from "../modals/modal-controller";
import { FormBgPattern } from "../auth/form-bg-pattern";
import Button from "../ui/button";
import { Product } from "@/types";
import { useModalAction } from "../modals/modal-controller";
import { useSupabase, userContext } from "@/context/supabase-context";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { myProductsState, productsState } from "@/recoil/atoms";
import toast from "react-hot-toast";

export default function DeleteProductForm() {
  const user = userContext();
  //get the product from the modal state
  const { data } = useModalState();
  const product = data as Product;
  const { closeModal } = useModalAction();
  const [loading, setLoading] = useState(false);
  const [myProducts, setMyProducts] = useRecoilState(myProductsState);

  const { supabase } = useSupabase();

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("owner", user?.id);
    if (error) console.log(error);
    if (data) {
      const products = data as Product[];
      setMyProducts(products);
    }
  };

  async function deleteImages() {
    if (!product.image_urls) return;
    //delete images
    let fileNames: string[] = [];
    product.image_urls &&
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

      if (error) toast.error("Delete product failed! Try again later.");

      fetchProducts().then(() => {
        setLoading(false);
        toast.success("Product deleted!");
        closeModal();
        return;
      });
    });
  }

  return (
    <div className=" bg-light dark:bg-dark-300 px-14 pb-12 pt-20">
      <FormBgPattern className="hidden xs:flex absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />

      <div className=" relative flex flex-col gap-8 ">
        <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
          Are you sure you want to{" "}
          <span className="text-red-500"> delete {product.product_name}? </span>
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
    </div>
  );
}
