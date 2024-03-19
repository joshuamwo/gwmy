interface SizeSelectorProps {
  selectedSize: string;
  sizes?: string[];
  handleSizeSelect: (color: String) => void;
}

export default function SizeSelector({
  selectedSize,
  sizes,
  handleSizeSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <h4 className="text-base font-medium text-dark-400 dark:text-light-600">
        Choose a Size
      </h4>

      <div className="mt-4 grid grid-cols-3 items-center gap-2">
        {sizes &&
          sizes.map((size) => (
            <div
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={`relative -m-0.5 flex  cursor-pointer items-center justify-center p-0.5 ring-gray-400 focus:outline-none`}
            >
              {/* <input
                  type="radio"
                  name="color-choice"
                  value={color}
                  className="sr-only"
                ></input> */}
              <span
                className={
                  size === selectedSize
                    ? " flex h-10 w-full items-center justify-center  rounded border border-black  border-opacity-10 text-lg font-medium text-dark-400 ring-2 ring-gray-700 dark:text-light-600 dark:ring-gray-300"
                    : " flex h-10 w-full items-center justify-center rounded border border-dark-300 border-opacity-10 text-lg font-medium text-dark-400 dark:border-dark-400 dark:text-light-600"
                }
              >
                {size.toUpperCase()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
