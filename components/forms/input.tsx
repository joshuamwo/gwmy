import { forwardRef } from "react";
import { classnames } from "@/utils/classnames";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  id: string;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = "text",
      className,
      inputClassName = "bg-transparent",
      id,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <label className="block text-sm">
          {label && (
            <span className="block cursor-pointer  pb-2.5  font-medium text-dark/70 rtl:text-right dark:text-light/70">
              {label}
            </span>
          )}
          {type === "textarea" ? (
            <textarea
              id={id}
              required={required}
              className={classnames(
                " w-full appearance-none rounded border border-light-500 bg-transparent  text-13px text-dark ring-[0.5px] ring-light-500 placeholder:text-dark-900 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:placeholder:text-dark-700 dark:focus:border-brand dark:focus:ring-brand  ",
                inputClassName,
              )}
            />
          ) : (
            <input
              id={id}
              type={type}
              ref={ref}
              required={required}
              {...props}
              className={classnames(
                " h-9 w-full appearance-none rounded border border-light-500 bg-transparent  text-13px text-dark ring-[0.5px] ring-light-500 placeholder:text-dark-900 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:placeholder:text-dark-700 dark:focus:border-brand dark:focus:ring-brand md:h-10",
                inputClassName,
              )}
            />
          )}
        </label>
        {error && (
          <span role="alert" className="block pt-2 text-xs text-warning">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
