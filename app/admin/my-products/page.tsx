"use client";
import Button from "@/components/ui/button";
import Search from "@/components/search";
import { PlusIcon } from "@/components/icons/plus-icon";
import { useModalAction } from "@/components/modals/modal-controller";
import { useSupabase, userContext } from "@/context/supabase-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MyProductsList from "@/components/sections/my-products-list";
import { useRecoilState } from "recoil";
import { myProductsState } from "@/recoil/atoms";
import { Product } from "@/types";

export default function MyProducts() {
  const { openModal } = useModalAction();
  const { supabase } = useSupabase();

  const user = userContext();

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
      <div className="flex-col p-5 md:p-8">
        <div className="sticky top-16 z-10 mb-8 flex flex-col rounded bg-light p-5 shadow-lg dark:bg-dark-200 md:p-8">
          <div className=" flex w-full flex-col  items-center md:flex-row">
            <div className="mb-4 sm:block md:mb-0 md:w-1/4">
              <h1 className="text-heading text-lg font-semibold">
                My Products
              </h1>
            </div>
            <div className="ms-auto flex w-full flex-col items-center md:w-3/4">
              <Search />
            </div>
            <div className="text-accent mt-5 hidden items-center whitespace-nowrap text-base font-semibold md:ms-5 md:mt-0 md:flex">
              <Button
                onClick={() =>
                  openModal("ADDPRODUCTFORM", {
                    productType: "Fashion",
                    productSubType: "",
                  })
                }
                className="bottom-24 right-6 h-8"
              >
                <label
                  htmlFor="add-product-button"
                  className="sm:text-md text-xs"
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
        onClick={() =>
          openModal("ADDPRODUCTFORM", {
            productType: "Fashion",
            productSubType: "",
          })
        }
        className="z-999 fixed bottom-24 right-6 h-16 w-16 rounded-full sm:bottom-6 md:hidden"
      >
        <PlusIcon className="h-6 fill-white" />
      </Button>
    </div>
  );
}
