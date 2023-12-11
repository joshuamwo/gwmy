"use client";
import Button from "@/components/ui/button";
import Search from "@/components/search";
import { PlusIcon } from "@/components/icons/plus-icon";
import { useModalAction } from "@/components/modals/modal-controller";
import { useSupabase } from "@/context/supabase-context";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MyProductsList from "@/components/sections/my-products-list";
import { useRecoilState, useRecoilValue } from "recoil";
import { myProductsState, userState } from "@/recoil/atoms";
import { Product } from "@/types";

export default function MyProducts() {
  const { openModal } = useModalAction();
  const { supabase } = useSupabase();
  const router = useRouter();
  const user = useRecoilValue(userState);

  const [products, setProducts] = useRecoilState(myProductsState);

  //fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("owner", user?.id);
    if (error) console.log(error);
    if (data) {
      const products = data as Product[];
      setProducts(products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="">
      <div className="p-5 md:p-8 flex-col">
        <div className="sticky top-16 z-10 p-5 md:p-8 bg-light dark:bg-dark-200 shadow-lg rounded mb-8 flex flex-col">
          <div className=" flex w-full flex-col  items-center md:flex-row">
            <div className="mb-4 md:mb-0 md:w-1/4 sm:block">
              <h1 className="text-lg font-semibold text-heading">
                My Products
              </h1>
            </div>
            <div className="flex w-full flex-col items-center ms-auto md:w-3/4">
              <Search />
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
      </div>

      <Button
        onClick={() => openModal("ADDPRODUCTFORM")}
        className="fixed z-999 bottom-24 sm:bottom-6 right-6 rounded-full h-16 w-16 md:hidden"
      >
        <PlusIcon className="fill-white h-6" />
      </Button>
    </div>
  );
}
