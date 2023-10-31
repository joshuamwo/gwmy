import { classnames } from "@/utils/classnames";
import NavLink from "@/components/ui/nav-link";
import { HomeIcon } from "../icons/home-icon";
import { SettingIcon } from "../icons/settings-icon";
import { HelpIcon } from "../icons/help-icon";

interface SidebarProps {
  sidebarIsOpen: boolean;
  className?: string;
}

export default function Sidebar({
  sidebarIsOpen,
  className = "hidden sm:flex fixed bottom-0 z-20 pt-[82px]",
}: SidebarProps) {
  return (
    <aside
      className={classnames(
        className,
        " transition-all duration-500 h-full flex-col justify-between overflow-y-auto border-r border-light-400 bg-light-100 text-dark-900 dark:border-0 dark:bg-dark-200",
        sidebarIsOpen ? "sm:w-[75px] xl:w-60" : "sm:w-60 xl:w-[75px]"
      )}
    >
      <div className="flex h-full w-full flex-col">
        <nav className="flex flex-col">
          <NavLink
            title="Home"
            href="/"
            sidebarIsOpen={sidebarIsOpen}
            icon={<HomeIcon className="h-[18px] w-[18px] text-current" />}
          />
        </nav>

        <nav className="mt-auto flex flex-col pb-4">
          <NavLink
            title="Settings"
            href="/settings"
            sidebarIsOpen={sidebarIsOpen}
            icon={<SettingIcon className="h-[18px] w-[18px] text-current" />}
          />
          <NavLink
            title="Help"
            href="/help"
            sidebarIsOpen={sidebarIsOpen}
            icon={<HelpIcon className="h-[18px] w-[18px] text-current" />}
          />
        </nav>
      </div>
    </aside>
  );
}
