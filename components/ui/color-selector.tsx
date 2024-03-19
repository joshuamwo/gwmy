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
      <h4 className="text-base font-medium text-dark-400 dark:text-light-600">
        Choose a Color
      </h4>

      <div className="mt-4 grid grid-cols-3 items-center gap-2">
        {colors &&
          colors.map((color) => (
            <div
              key={color}
              onClick={() => handleColorSelect(color)}
              className={
                selectedColor === color
                  ? "bg-secondary text-primary-light  relative flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md border-2 border-solid border-gray-700 px-2 py-3 no-underline motion-safe:transition motion-safe:duration-300  motion-safe:ease-out dark:border-gray-700 "
                  : "bg-secondary text-primary-light border-primary relative flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-solid px-2 py-3 no-underline motion-safe:transition motion-safe:duration-300  motion-safe:ease-out dark:border-dark-400 "
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
                    ? "h-6 w-6  rounded-full border border-black border-opacity-10 dark:ring-gray-500"
                    : "h-6  w-6 rounded-full border border-dark-300 border-opacity-10 opacity-40"
                }
              ></span>
              <span>{color}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
