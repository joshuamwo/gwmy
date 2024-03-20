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
      className="my-0.5 flex items-center gap-1 px-4 py-3 text-dark-400 hover:bg-light-300 dark:text-light-800 hover:dark:bg-dark-300 xs:px-6 sm:my-1 sm:gap-1.5 sm:px-7 lg:gap-2 xl:my-0.5"
      activeClassName="text-dark-100 active-text-dark dark:active-text-light dark:text-brand shadow-inner font-medium bg-light-200 dark:bg-dark-200 hover:bg-light-600 hover:dark:bg-dark-500"
    >
      <span
        className={classnames(
          "flex flex-shrink-0 items-center justify-start",
          sidebarIsOpen ? "w-8 xl:w-auto" : "w-auto xl:w-8",
        )}
      >
        {icon}
      </span>
      <span
        className={classnames(
          "text-base font-medium",
          sidebarIsOpen ? "inline-flex xl:hidden" : "hidden xl:inline-flex",
        )}
      >
        {title}
      </span>
    </ActiveLink>
  );
}
