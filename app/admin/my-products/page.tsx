"use client";
import Button from "@/components/ui/button";
import Search from "@/components/search";
import { PlusIcon } from "@/components/icons/plus-icon";
import { useModalAction } from "@/components/modals/modal-controller";
import { useSupabase } from "@/context/supabase-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyProductsList from "@/components/sections/my-products-list";
import { useRecoilState } from "recoil";
import { productState } from "@/recoil/atoms";
import { Product } from "@/types";

export default function MyProducts() {
  const { openModal } = useModalAction();
  const { supabase } = useSupabase();
  const router = useRouter();

  const [products, setProducts] = useRecoilState(productState);

  //fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log(error);
    if (data) {
      const products = data as Product[];
      setProducts(products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [supabase]);

  return (
    <div className="h-full p-5 md:p-8 flex-col">
      <div
        className="p-5 md:p-8 bg-light dark:bg-dark-200 shadow rounded mb-8 flex flex-col"
        style={{ position: "relative" }}
      >
        <div className="flex w-full flex-col  items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4 sm:block">
            <h1 className="text-lg font-semibold text-heading">Products</h1>
          </div>
          <div className="hidden md:flex mt-5 items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5">
            <Button
              onClick={() => openModal("ADDPRODUCTFORM")}
              className="h-8 bottom-24 right-6"
            >
              <label
                htmlFor="add-product-button"
                className="text-xs sm:text-md"
              >
                Add Product
              </label>
            </Button>
          </div>
        </div>
      </div>

      <div className="">
        <MyProductsList />
      </div>

      <Button
        onClick={() => openModal("ADDPRODUCTFORM")}
        className="absolute bottom-24 sm:bottom-6 right-6 rounded-full h-16 w-16 md:hidden"
      >
        <PlusIcon className="fill-white h-6" />
      </Button>
    </div>
  );
}
