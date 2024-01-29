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
}

export default function ArrayInput({
  label,
  placeholder,
  handleInput,
  array,
  inputType,
}: Props) {
  const [input, setInput] = useState<any>();

  function handleAddElement(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!input) return;
    if (e.key === "Enter") {
      const newArray = [...array, input];
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
    <div className="gap-1 flex flex-col">
      {label && (
        <span className="block text-13px cursor-pointer pb-2.5 font-normal text-dark/70 rtl:text-right dark:text-light/70">
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {array &&
          array.map((variation, index) => (
            <span
              key={index}
              className=" flex flex-row gap-1 h-[30px] shrink-0 !rounded-full border py-1.5 px-3.5 text-xs font-medium outline-none border-light-500 bg-light-400 text-dark-100 hover:bg-light-500 dark:border-dark-500 dark:bg-dark-400 dark:text-light-100 hover:dark:bg-dark-500 hover:dark:text-light"
            >
              <span>{variation}</span>
              {/* <span className="rounded-2xl text-13px font-semibold uppercase text-brand  dark:text-brand-dark">
                {variation.price}
              </span> */}
              <Button
                variant="icon"
                className="hover:bg-light-900 dark:hover:bg-dark-400 scale-90 hover:scale-110 rounded-full group"
                onClick={() => handleRemoveElement(index)}
              >
                <XIcon className="w-4 h-4  group-hover:text-white" />
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
          required
          placeholder={placeholder}
          type={inputType}
        />
      </div>
    </div>
  );
}
