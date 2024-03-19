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
      <h4 className="text-base font-medium text-dark-400 dark:text-light-600">
        Quantity
      </h4>
      <div className="my-3">
        <label htmlFor="Quantity" className="sr-only  ">
          {" "}
          Quantity{" "}
        </label>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity < 2}
            className="flex h-10  w-10 items-center justify-center rounded-l border border-r-0 border-dark-400 border-opacity-10 leading-10 text-dark-400 transition hover:opacity-75 dark:border-light-600 dark:border-opacity-10 dark:text-light-600"
          >
            -
          </button>

          <input
            type="number"
            id="Quantity"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            value={quantity}
            className="h-10 w-16 border-dark-400 border-opacity-10 text-center dark:border-light-600 dark:border-opacity-10 dark:bg-dark-250 dark:text-light-600 sm:text-sm"
          />

          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-r border-b border-r border-t border-dark-400 border-opacity-10 leading-10 text-dark-400 transition hover:opacity-75 dark:border-light-600 dark:border-opacity-10 dark:text-light-600"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
