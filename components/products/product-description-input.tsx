import Input from "../forms/input";

interface ProductDescriptionInputProps {
  product_description: string;
  handleInput: (id: string, value: any) => void;
}

export default function ProductDescriptionInput({
  product_description,
  handleInput,
}: ProductDescriptionInputProps) {
  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleInput("product_description", e.target.value);
  }

  return (
    <Input
      id="product_description"
      className="w-full "
      label="Product Desctiption"
      inputClassName="bg-light dark:bg-dark-300 w-full !mb-5"
      type="text"
      onChange={(e) => handleDescriptionChange(e)}
      required
      placeholder="Write Product Description"
      value={product_description}
    />
  );
}
