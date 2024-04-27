import NavLink from "@/components/ui/nav-link";
import { MusicIcon } from "../ui/music-icon";
import { TicketIcon } from "../icons/ticket-icon";

interface SidebarProps {
  sidebarIsOpen: boolean;
  classname?: string;
}

export default function AdminSidebar({
  sidebarIsOpen,
  classname,
}: SidebarProps) {
  return (
    <>
      <nav className="flex flex-col gap-4 p-5 text-dark-600 dark:text-light-900 ">
        <NavLink
          title="My Music"
          href="/admin/my-music"
          sidebarIsOpen={sidebarIsOpen}
          icon={<MusicIcon className="h-6 w-6 text-current" />}
        />
        <NavLink
          title="My Events"
          href="/admin/my-events"
          sidebarIsOpen={sidebarIsOpen}
          icon={<TicketIcon className="h-6 w-6 text-current " />}
        />
      </nav>
    </>
  );
}
