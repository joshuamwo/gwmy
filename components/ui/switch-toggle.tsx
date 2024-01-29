import { useState } from "react";
import { Switch } from "@headlessui/react";
import { classnames } from "@/utils/classnames";

interface SwitchToggleState {
  state: boolean;
  setState: (state: boolean) => void;
  className?: string;
  switchClassName?: string;
  disabled?: boolean;
  label?: string;
}

export default function SwitchToggle({
  state,
  setState,
  className,
  switchClassName,
  disabled = false,
  label,
}: SwitchToggleState) {
 

  return (
    <div
      className={classnames(
        className,
        "flex flex-row items-center justify-between hover:animate-pulse"
      )}
    >
      {label && (
        <span className=" cursor-pointer text-sm flex justify-center font-normal text-dark/70 rtl:text-right dark:text-light/70">
          {label}
        </span>
      )}
      <div className={switchClassName}>
        <Switch
          disabled={disabled}
          checked={state}
          onChange={(e) => setState(e)}
          className={`${state ? "bg-brand" : "bg-dark-500"}
          relative items-center  inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${state ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </div>
  );
}
