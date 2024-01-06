interface ColorSelectorProps {
  selectedColor: string;
  colors?: string[];
  handleColorSelect: (color: String) => void;
}

export default function ColorSelector({
  selectedColor,
  colors,
  handleColorSelect,
}: ColorSelectorProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">
        Choose a Color
      </h4>

      <div className="grid gap-2 items-center mt-4 grid-cols-3">
        {colors &&
          colors.map((color) => (
            <div
              key={color}
              onClick={() => handleColorSelect(color)}
              className={
                selectedColor === color
                  ? "cursor-pointer flex  dark:border-gray-700 flex-row gap-2 items-center justify-center w-full relative px-2 py-3 border-2 border-solid rounded-md no-underline motion-safe:transition motion-safe:ease-out motion-safe:duration-300 bg-secondary  text-primary-light border-gray-700 "
                  : "cursor-pointer flex flex-row gap-2 dark:border-dark-400 items-center justify-center w-full relative px-2 py-3 border border-solid rounded-md no-underline motion-safe:transition motion-safe:ease-out motion-safe:duration-300 bg-secondary  text-primary-light border-primary "
              }
            >
              {/* <input
                  type="radio"
                  name="color-choice"
                  value={color}
                  className="sr-only"
                ></input> */}
              <span
                style={{ backgroundColor: `${color}` }}
                className={
                  selectedColor === color
                    ? "h-4 w-4  dark:ring-gray-500 rounded-full border border-black border-opacity-10"
                    : "h-4 w-4  rounded-full border bo rder-dark-300 border-opacity-10 opacity-40"
                }
              ></span>
              <span>{color}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
