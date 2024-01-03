interface ColorSelectorProps {
  selectedColor: string;
  colors?: string[];
}

export default function ColorSelector() {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900">Color</h4>

      <fieldset className="mt-4">
        <legend className="sr-only">Choose a color</legend>
        <span className="flex items-center space-x-3">
          {/* <!--
                          Active and Checked: "ring ring-offset-1"
                          Not Active and Checked: "ring-2"
                        --> */}
          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
            <input
              type="radio"
              name="color-choice"
              value="White"
              className="sr-only"
              aria-labelledby="color-choice-0-label"
            ></input>
            <span id="color-choice-0-label" className="sr-only">
              White
            </span>
            <span
              aria-hidden="true"
              className="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"
            ></span>
          </label>
          {/* <!--
                          Active and Checked: "ring ring-offset-1"
                          Not Active and Checked: "ring-2"
                        --> */}
          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
            <input
              type="radio"
              name="color-choice"
              value="Gray"
              className="sr-only"
              aria-labelledby="color-choice-1-label"
            ></input>
            <span id="color-choice-1-label" className="sr-only">
              Gray
            </span>
            <span
              aria-hidden="true"
              className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
            ></span>
          </label>
          {/* <!--
                          Active and Checked: "ring ring-offset-1"
                          Not Active and Checked: "ring-2"
                        --> */}
          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
            <input
              type="radio"
              name="color-choice"
              value="Black"
              className="sr-only"
              aria-labelledby="color-choice-2-label"
            ></input>
            <span id="color-choice-2-label" className="sr-only">
              Black
            </span>
            <span
              aria-hidden="true"
              className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"
            ></span>
          </label>
        </span>
      </fieldset>
    </div>
  );
}
