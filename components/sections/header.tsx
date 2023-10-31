import Hamburger from "../ui/hamburger";

interface HeaderProps {
  sidebarIsOpen: boolean;
  sidebarToggle: () => void;
}

export default function Header({ sidebarIsOpen, sidebarToggle }: HeaderProps) {
  return (
    <div className="app-header sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-light-300 bg-light py-1 px-4 ltr:left-0 rtl:right-0 dark:border-dark-300 dark:bg-dark-250 sm:h-[70px] sm:px-6">
      <Hamburger
        className="hidden sm:flex"
        onClick={() => sidebarToggle()}
        sidebarIsOpen={sidebarIsOpen}
      />
    </div>
  );
}
