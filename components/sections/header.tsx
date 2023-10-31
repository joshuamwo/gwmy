import Hamburger from "../ui/hamburger";
import Link from "next/link";
import SearchButton from "@/components/ui/search-button";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { usePathname } from "next/navigation";
import CartButton from "@/components/ui/cart-button";
import ProfileMenu from "../menus/profile-menu";

interface HeaderProps {
  sidebarIsOpen: boolean;
  sidebarToggle: () => void;
}

export default function Header({ sidebarIsOpen, sidebarToggle }: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className="app-header sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-light-300 bg-light py-1 px-4 ltr:left-0 rtl:right-0 dark:border-dark-300 dark:bg-dark-250 sm:h-[70px] sm:px-6">
      <div className="flex items-center gap-4">
        <Hamburger
          className="hidden sm:flex"
          onClick={() => sidebarToggle()}
          sidebarIsOpen={sidebarIsOpen}
        />
        <Link href="/">
          <h1 className="font-bold">GWMY</h1>
        </Link>
      </div>
      <div className="relative flex items-center gap-5 pr-0.5 xs:gap-6 sm:gap-7">
        <SearchButton className="hidden sm:flex" />
        <ThemeSwitcher />
        {pathname !== "/checkout" && <CartButton className="hidden sm:flex" />}

        <ProfileMenu />
      </div>
    </div>
  );
}
