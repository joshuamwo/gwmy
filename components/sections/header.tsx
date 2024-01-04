import Hamburger from "../ui/hamburger";
import Link from "next/link";
import SearchButton from "@/components/ui/search-button";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { usePathname } from "next/navigation";
import CartButton from "@/components/ui/cart-button";
import ProfileMenu from "../menus/profile-menu";
import { Span } from "next/dist/trace";

interface HeaderProps {
  sidebarIsOpen: boolean;
  sidebarToggle: () => void;
  isUserLoggedIn: boolean;
}

export default function Header({
  sidebarIsOpen,
  sidebarToggle,
  isUserLoggedIn,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className="app-header sticky top-0 z-30 flex h-16 w-full  items-center justify-between  bg-light py-1 px-4 left-0  dark:bg-dark-200 sm:h-[70px] sm:px-6">
      <div className="flex items-center gap-4">
        <Hamburger
          className="hidden sm:flex"
          onClick={() => sidebarToggle()}
          sidebarIsOpen={sidebarIsOpen}
        />
        <Link href="/" className="flex gap-1">
          {/* <h1 className="font-bold">GWMY</h1> */}
          {["G", "W", "M", "Y"].map((letter) => (
            <div className="group" key={letter}>
              <h1 className=" bg-brand hover:bg-dark-400 transition-all duration-500 p-1 w-8 justify-center flex rounded">
                {letter}
              </h1>
              {/* tooltip */}
              <div className=" hidden  mt-1 w-8 absolute p-1 rounded bg-brand text-center group-hover:flex group-hover:animate-bounce  flex-col ">
                {letter === "G"
                  ? ["O", "D"].map((letter) => <span key={letter}>{letter}</span>)
                  : letter === "W"
                  ? ["W", "A", "N", "T", "S"].map((letter) => (
                      <span key={letter}>{letter}</span>
                    ))
                  : letter === "M"
                  ? ["E"].map((letter) => <span key={letter}>{letter}</span>)
                  : ["Y", "O", "U", "N", "G"].map((letter) => (
                      <span key={letter}>{letter}</span>
                    ))}
              </div>
            </div>
          ))}
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
