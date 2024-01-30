"use client";
import { useState } from "react";
import { ProductInput, Product } from "@/types";
import { XIcon } from "../ui/x-icon";
import Button from "../ui/button";
import Input from "./input";
import { ProductVariationType } from "@/types";

interface Props {
  label: string;
  placeholder: string;
  handleInput: (value: any) => void;
  array: any[];
  inputType: React.HTMLInputTypeAttribute;
  name?: string;
  formInputId?: string;
}

export default function ArrayInput({
  label,
  placeholder,
  handleInput,
  array,
  inputType,
  name,
  formInputId,
}: Props) {
  const [input, setInput] = useState<string>();

  function handleAddElement(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!input) return;
    if (e.key === "Enter") {
      // array is submtted as one string with comma separated
      // values so string elements cannot have commas
      const filteredInput = input.replaceAll(",", "");
      const newArray = [...array, filteredInput];
      setInput("");
      handleInput(newArray);
    }
    return;
  }

  function handleRemoveElement(index: number) {
    const newArray = array.filter((item, i) => i !== index);
    handleInput(newArray);
    return;
  }

  return (
    <div className="flex flex-col gap-1">
      <input id={formInputId} type="hidden" name={name} value={array} />
      {label && (
        <span className="block cursor-pointer pb-2.5 text-13px font-normal text-dark/70 rtl:text-right dark:text-light/70">
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {array &&
          array.map((variation, index) => (
            <span
              key={index}
              className=" flex h-[30px] shrink-0 flex-row gap-1 !rounded-full border border-light-500 bg-light-400 px-3.5 py-1.5 text-xs font-medium text-dark-100 outline-none hover:bg-light-500 dark:border-dark-500 dark:bg-dark-400 dark:text-light-100 hover:dark:bg-dark-500 hover:dark:text-light"
            >
              <span>{variation}</span>
              {/* <span className="rounded-2xl text-13px font-semibold uppercase text-brand  dark:text-brand-dark">
                {variation.price}
              </span> */}
              <Button
                variant="icon"
                className="group scale-90 rounded-full hover:scale-110 hover:bg-light-900 dark:hover:bg-dark-400"
                onClick={() => handleRemoveElement(index)}
              >
                <XIcon className="h-4 w-4  group-hover:text-white" />
              </Button>
            </span>
          ))}
      </div>
      <div className="flex w-full">
        {" "}
        <Input
          id="array_input"
          className="w-full"
          inputClassName="bg-light dark:bg-dark-300 "
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleAddElement(e)}
          value={input}
          placeholder={placeholder}
          type={inputType}
        />
      </div>
    </div>
  );
}
