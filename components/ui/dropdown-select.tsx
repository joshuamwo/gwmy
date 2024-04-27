import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "./check-icon";
import { ChevronUpDownIcon } from "./chevron-up-down-icon";

export default function DropdownSelect({
  options,
  name,
  multiple,
  label,
}: {
  options: string[];
  name: string;
  multiple?: boolean;
  label?: string;
}) {
  const [selected, setSelected] = useState<string[]>();

  return (
    <div className="z-20 w-full">
      <label className="block text-13px">
        {label && (
          <span className="block cursor-pointer pb-2.5 font-normal text-dark/70 dark:text-light/70">
            {label}
          </span>
        )}
      </label>

      {name && <input type="hidden" name={name} value={selected?.toString()} />}

      <Listbox value={selected} onChange={setSelected} multiple={multiple}>
        <div className="relative mt-1">
          <Listbox.Button className="h-9 w-full appearance-none rounded border border-light-500 bg-transparent px-4 py-2 text-start text-13px !text-dark ring-[0.5px] ring-light-500 placeholder:text-dark-900 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:placeholder:text-dark-700 dark:focus:border-brand dark:focus:ring-brand md:h-10 lg:px-5 ">
            <span className="block truncate text-dark dark:text-light">
              {selected?.toString()}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-300 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-dark-200 sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 font-medium ${
                      active && "text-brand"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
