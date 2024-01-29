import AutocompleteDropdown from "../ui/autocomplete-dropdown";
import { productTypes, productSubTypes } from "@/constants/product";
import { ProductType } from "@/types";

interface Props {
  productType: ProductType;
  productSubType?: string;
  handleTypeChange: (value: ProductType) => void;
  handleSubTypeChange: (value: string) => void;
}

export default function ProductTypeSelector({
  productType,
  productSubType,
  handleSubTypeChange,
  handleTypeChange,
}: Props) {
  function typeChange(value: ProductType) {
    handleSubTypeChange("");
    handleTypeChange(value);
  }
  function subTypeChange(value: string) {
    handleSubTypeChange(value);
  }

  return (
    <div className="flex flex-row w-full gap-4 justify-between h-44">
      <AutocompleteDropdown
        options={productTypes}
        selectedOption={productType}
        setSelectedOption={typeChange}
      />
      <AutocompleteDropdown
        options={productType ? productSubTypes[productType] : []}
        selectedOption={productSubType}
        setSelectedOption={subTypeChange}
      />
    </div>
  );
}
