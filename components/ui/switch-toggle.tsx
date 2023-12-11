import { useState } from "react";
import { Switch } from "@headlessui/react";

interface SwitchToggleState {
  stateName: string;
  state: boolean;
  setState: (id: string, state: boolean) => void;
  className?: string;
}

export default function SwitchToggle({
  state,
  setState,
  stateName,
  className,
}: SwitchToggleState) {
  const [enabled, setEnabled] = useState(state);
  function handleSwitchToggle(e: boolean) {
    setEnabled(e);
    setState(stateName, e);
  }

  return (
    <div className={className}>
      <Switch
        checked={enabled}
        onChange={(e) => handleSwitchToggle(e)}
        className={`${enabled ? "bg-brand" : "bg-dark-500"}
          relative items-center  inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
