import { forwardRef } from "react";
import { classnames } from "@/utils/classnames";
import { SpinnerIcon } from "@/components/icons/spinner-icon";
import { useFormStatus } from "react-dom";
import { SuccessIcon } from "../icons/success-icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: "text" | "outline" | "solid" | "icon" | "solidDanger";
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  usePending?: boolean;
  success?: boolean;
}

const variantClasses = {
  text: "text-dark dark:text-light",
  outline:
    "min-h-[32px]  rounded py-3 px-4 md:px-5 bg-transparent border border-light-500 dark:border-dark-600 text-dark dark:text-light hover:bg-light-400 focus:bg-light-500 dark:hover:bg-dark-600 dark:focus:bg-dark-600",
  solid:
    "min-h-[32px] rounded py-3 px-4 md:px-5 bg-brand text-white hover:bg-brand-dark focus:bg-brand-dark",
  icon: "transition-colors duration-200 text-dark-600 dark:text-dark-800 hover:text-dark-900 dark:hover:text-light-600",
  solidDanger:
    "min-h-[32px] rounded py-3 px-4 md:px-5 bg-red-500 text-white hover:bg-red-600 focus:bg-red-600",
};

function Button({
  className,
  isLoading,
  disabled,
  children,
  variant = "solid",
  type = "button",
  usePending,
  success,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  const loading = usePending ? pending : isLoading;
  return (
    <button
      className={classnames(
        "transition-fill-colors flex items-center justify-center gap-2 font-semibold duration-200",
        loading || disabled
          ? "pointer-events-none cursor-not-allowed opacity-70"
          : "pointer-events-auto cursor-pointer opacity-100",
        success && "is-carting",
        variantClasses[variant],
        className,
      )}
      type={type}
      {...props}
      disabled={disabled}
    >
      {loading && (
        <SpinnerIcon className="absolute left-2 w-5 animate-spin xs:right-4 " />
      )}
      {children}
      {!success && ""}
      <SuccessIcon className="absolute right-2 h-auto w-5 xs:right-4 xs:w-6" />
    </button>
  );
}

export default Button;
