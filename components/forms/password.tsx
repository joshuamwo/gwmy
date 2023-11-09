import { useState, forwardRef } from "react";
import { classnames } from "@/utils/classnames";
import { EyeCloseIcon } from "../icons/eye-close-icon";
import { EyeOpenIcon } from "../icons/eye-open-icon";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
};

const Password = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className, inputClassName = "bg-transparent", ...props },
    ref
  ) => {
    let [showPassword, setShowPassword] = useState(false);
    return (
      <div className={className}>
        <label className="block text-13px">
          {label && (
            <span className="block cursor-pointer pb-2.5 font-normal text-dark/70  dark:text-light/70">
              {label}
            </span>
          )}

          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              ref={ref}
              {...props}
              className={classnames(
                "h-11 w-full appearance-none rounded border border-light-500 bg-transparent py-2 text-13px text-dark ring-[0.5px] ring-light-500 focus:border-brand focus:ring-[0.5px] focus:ring-brand  pl-4  pr-12  dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:focus:border-brand dark:focus:ring-brand md:h-12 lg:pr-12 lg:pl-5 xl:h-[50px]",
                inputClassName
              )}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute top-0 flex h-full w-[34px] cursor-pointer items-center justify-start text-dark-900 hover:text-dark-700 right-0  dark:text-dark-800 hover:dark:text-light-900 lg:w-9"
            >
              {showPassword ? (
                <EyeCloseIcon className="h-auto w-5" />
              ) : (
                <EyeOpenIcon className="h-auto w-5" />
              )}
            </span>
          </span>
        </label>

        {error && (
          <span role="alert" className="block pt-2 text-xs text-warning">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Password.displayName = "Password";
export default Password;
