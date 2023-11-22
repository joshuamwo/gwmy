"use client";
import { classnames } from "@/utils/classnames";
import { SearchIcon } from "./icons/search-icon";

interface SearchProps {
  className?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  inputClassName?: string;
  onSearch?: (data: SearchValue) => void;
}

interface SearchValue {
  searchText: string;
}

export default function Search({
  className,
  shadow,
  variant,
  inputClassName,
  onSearch,
}: SearchProps) {
  return (
    <form
      noValidate
      role="search"
      className={classnames("relative flex w-full items-center", className)}
      onSubmit={() => null}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <button className="start-1 absolute p-2 text-body outline-none focus:outline-none active:outline-none">
        <SearchIcon className="h-5 w-5" />
      </button>
      <input
        type="text"
        id="search"
        className="ps-10 pe-4 h-10 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
        placeholder="Type your query and press Enter"
        aria-label="Search"
        autoComplete="off"
      />
    </form>
  );
}
