import AutocompleteDropdown from "../ui/autocomplete-dropdown";
import { productCategories, productSubCategories } from "@/constants/product";
import { ProductInput, ProductType } from "@/types";

interface Props {
  product_category: ProductType;
  product_sub_category: string;
  handleCategoryChange: (id: string, value: string) => void;
  handleSubCategoryChange: (id: string, value: string) => void;
}

export default function ProductCategorySelector({
  product_category,
  product_sub_category,
  handleCategoryChange,
  handleSubCategoryChange,
}: Props) {
  function categoryChange(value: string) {
    handleCategoryChange("category", value);
  }
  function subCategoryChange(value: string) {
    handleSubCategoryChange("sub_category", value);
  }

  return (
    <div className="flex flex-row w-full gap-4 justify-between h-44">
      <AutocompleteDropdown
        options={productCategories}
        selectedOption={product_category}
        setSelectedOption={categoryChange}
        label="Category"
      />
      <AutocompleteDropdown
        options={product_category ? productSubCategories[product_category] : []}
        selectedOption={product_sub_category}
        setSelectedOption={subCategoryChange}
        label="Sub Category"
      />
    </div>
  );
}
