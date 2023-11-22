import Button from "@/components/ui/button";
import Search from "@/components/search";
import { PlusIcon } from "@/components/icons/plus-icon";

export default function MyProducts() {
  return (
    <div className="h-full p-5 md:p-8">
      <div className="p-5 md:p-8 bg-light dark:bg-dark-200 shadow rounded mb-8 flex flex-col">
        <div className="flex w-full flex-col  items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4 sm:block">
            <h1 className="text-lg font-semibold text-heading">Products</h1>
          </div>
          <div className="flex w-full flex-col items-center ms-auto md:w-3/4">
            <Search />
          </div>
          <div className="hidden md:flex mt-5 items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5">
            <Button className="h-8 bottom-24 right-6">
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
      <Button className="absolute bottom-24 sm:bottom-6 right-6 rounded-full h-16 w-16 md:hidden">
        <PlusIcon className="fill-white h-6" />
      </Button>
    </div>
  );
}
