import NavLink from "@/components/ui/nav-link";
import { MusicIconSolid } from "../icons/musicIconSolid";
import { TicketIcon } from "../icons/ticket-icon";

interface SidebarProps {
  sidebarIsOpen: boolean;
  classname?: string;
}

export default function CustomerSidebar({
  sidebarIsOpen,
  classname,
}: SidebarProps) {
  return (
    <>
      <nav className="flex flex-col gap-4 p-5 text-dark-600 dark:text-light-900 ">
        <NavLink
          title="Music"
          href="/music"
          sidebarIsOpen={sidebarIsOpen}
          icon={<MusicIconSolid className="h-6 w-6	 text-current" />}
        />
        <NavLink
          title="Events"
          href="/events"
          sidebarIsOpen={sidebarIsOpen}
          icon={<TicketIcon className="h-6 w-6 text-current" />}
        />
      </nav>
    </>
  );
}
