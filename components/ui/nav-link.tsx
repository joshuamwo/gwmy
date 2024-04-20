import ActiveLink from "./active-link";
import { classnames } from "@/utils/classnames";

interface NavLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
  sidebarIsOpen?: boolean;
}

export default function NavLink({
  href,
  icon,
  title,
  sidebarIsOpen,
}: NavLinkProps) {
  return (
    <ActiveLink
      href={href}
      className="flex h-full items-center justify-start gap-1 py-3 text-dark-600 hover:text-dark-300 dark:text-dark-800  hover:dark:bg-dark-300  sm:gap-1.5  lg:gap-2"
      activeClassName="!text-brand active-text-dark dark:active-text-light !dark:text-brand font-medium "
    >
      <span
        className={classnames(
          "flex flex-shrink-0 items-center gap-4  ",
          sidebarIsOpen
            ? "w-full justify-start px-4 "
            : "w-full justify-center ",
        )}
      >
        <span className=" ">{icon}</span>
        <span
          className={classnames(
            "justify-start text-sm font-semibold ",
            sidebarIsOpen ? "inline-flex xl:hidden" : "hidden xl:inline-flex",
          )}
        >
          {title}
        </span>
      </span>
    </ActiveLink>
  );
}
