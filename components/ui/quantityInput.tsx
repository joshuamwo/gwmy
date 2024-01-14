type QuantityInputProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export default function QuantityInput({
  quantity,
  setQuantity,
}: QuantityInputProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">
        Quantity
      </h4>
      <div className="my-3">
        <label htmlFor="Quantity" className="sr-only">
          {" "}
          Quantity{" "}
        </label>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity < 2}
            className="h-10 w-10  flex justify-center items-center rounded-l border-l border-t border-b border-dark-300 dark:border-dark-400 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
          >
            -
          </button>

          <input
            type="number"
            id="Quantity"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            value={quantity}
            className="h-10 w-16 text-center border-dark-300 dark:border-dark-400 dark:bg-dark-250 dark:text-white sm:text-sm"
          />

          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 w-10 flex justify-center items-center rounded-r border-r border-t border-b border-dark-300 dark:border-dark-400 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
