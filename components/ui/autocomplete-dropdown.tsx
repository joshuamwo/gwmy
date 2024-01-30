import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "./check-icon";
import { ChevronUpDownIcon } from "./chevron-up-down-icon";

interface propsType {
  options: Array<string>;
  selectedOption: string | undefined;
  setSelectedOption: React.Dispatch<React.SetStateAction<any>>;
  label?: string;
  name?: string;
  className?: string;
  required?: boolean;
}

export default function AutoCompleteDropDown({
  options,
  selectedOption,
  setSelectedOption,
  label,
  className,
  name,
  required,
}: propsType) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="block text-13px">
      <label className="block text-13px">
        {label && (
          <span className="block cursor-pointer pb-2.5 font-normal text-dark/70 rtl:text-right dark:text-light/70">
            {label}
          </span>
        )}
      </label>

      <Combobox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative mt-1">
          <div className="">
            <Combobox.Input
              className="h-9 w-full appearance-none rounded border border-light-500 bg-transparent px-4 py-2 text-13px text-dark ring-[0.5px] ring-light-500 placeholder:text-dark-900 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:placeholder:text-dark-700 dark:focus:border-brand dark:focus:ring-brand md:h-10 lg:px-5 "
              displayValue={() => selectedOption ?? "Select Album"}
              onChange={(event) => setQuery(event.target.value)}
              required={required}
              name={name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-32 w-full overflow-auto rounded-md bg-light py-1 text-xs shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-dark-400 sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-light">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-teal-600 text-white"
                          : "text-gray-900 dark:text-light"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
