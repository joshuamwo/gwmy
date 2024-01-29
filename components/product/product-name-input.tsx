import Input from "../forms/input";

interface ProductNameInputProps {
  product_name: string;
  handleInput: (id: string, value: any) => void;
}

export default function ProductNameInput({
  product_name,
  handleInput,
}: ProductNameInputProps) {
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleInput("product_name", e.target.value);
  }
  return (
    <div className="w-full justify-between">
      {" "}
      <Input
        id="product_name"
        label="Product Name"
        className=""
        inputClassName="bg-light dark:bg-dark-300 "
        onChange={(e) => handleNameChange(e)}
        required
        placeholder="Name"
        value={product_name}
      />
    </div>
  );
}
