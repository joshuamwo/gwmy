import { classnames } from "@/utils/classnames";
import NavLink from "@/components/ui/nav-link";
import { HomeIcon } from "../icons/home-icon";
import { SettingIcon } from "../icons/settings-icon";
import { HelpIcon } from "../icons/help-icon";

interface SidebarProps {
  sidebarIsOpen: boolean;
  classname?: string;
}

export default function CustomerSidebar({
  sidebarIsOpen,
  classname,
}: SidebarProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <nav className="flex flex-col">
        <NavLink
          title="Home"
          href="/"
          sidebarIsOpen={sidebarIsOpen}
          icon={<HomeIcon className="h-6 w-6 text-current" />}
        />
      </nav>

      <nav className="mt-auto flex flex-col pb-4">
        <NavLink
          title="Settings"
          href="/settings"
          sidebarIsOpen={sidebarIsOpen}
          icon={<SettingIcon className="h-6 w-6 text-current" />}
        />
        <NavLink
          title="Help"
          href="/help"
          sidebarIsOpen={sidebarIsOpen}
          icon={<HelpIcon className="h-6 w-6 text-current" />}
        />
      </nav>
    </div>
  );
}
