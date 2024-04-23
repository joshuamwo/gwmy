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
      className="flex h-full items-center gap-1 tracking-wide sm:gap-2 "
      activeClassName="text-dark-200 dark:text-light-200 font-medium "
    >
      <span
        className={classnames(
          "flex  w-full items-center gap-4  ",
          sidebarIsOpen ? "justify-start" : "justify-center p-0 ",
        )}
      >
        <span className=" ">{icon}</span>
        <span
          className={classnames(
            "justify-start text-sm font-semibold ",
            sidebarIsOpen ? "flex" : "hidden",
          )}
        >
          {title}
        </span>
      </span>
    </ActiveLink>
  );
}
