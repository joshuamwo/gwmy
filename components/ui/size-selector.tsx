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
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">
        Choose a Size
      </h4>

      <div className="flex items-center mt-4 space-x-3">
        {sizes &&
          sizes.map((size) => (
            <div
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={`relative -m-0.5 flex  cursor-pointer items-center justify-center p-0.5 focus:outline-none ring-gray-400`}
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
                    ? "h-7 w-9 flex rounded  justify-center items-center font-medium  ring-2 ring-gray-700 dark:ring-gray-300 border border-black border-opacity-10"
                    : "h-7 w-9 flex rounded justify-center items-center font-medium border border-black border-opacity-10"
                }
              >
                {size}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
