import Hamburger from "../ui/hamburger";
import Link from "next/link";
import SearchButton from "@/components/ui/search-button";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { usePathname } from "next/navigation";
import CartButton from "@/components/ui/cart-button";
import ProfileMenu from "../menus/profile-menu";
import { Span } from "next/dist/trace";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { useCart } from "@/context/cart-context";
import { useDrawer } from "../drawer/drawer-context";
import { useEffect } from "react";

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
  const drawer = useDrawer();
  const { getCartTotalCount } = useCart();

  function handleOpenCart() {
    drawer.openDrawer("CART_VIEW");
  }

  // keeping count of items in the cart
  let cartCount: number = 0;
  const cart = useCart();

  useEffect(() => {
    cartCount = cart.getCartTotalCount();
  }, [cart]);

  return (
    <div className="app-header sticky left-0 top-0 z-30 flex h-16  w-full items-center justify-between bg-light-400 px-4 py-1  dark:bg-dark-300 sm:h-[70px] sm:px-6">
      <div className="flex items-center gap-4">
        <Hamburger
          className="hidden sm:flex"
          onClick={() => sidebarToggle()}
          sidebarIsOpen={sidebarIsOpen}
        />
        <Link href="/" className="flex gap-1 text-light-200">
          {/* <h1 className="font-bold">GWMY</h1> */}
          {["G", "W", "M", "Y"].map((letter) => (
            <div className="group" key={letter}>
              <h1 className=" flex w-8 justify-center rounded bg-brand p-1 transition-all duration-500 hover:bg-dark-400">
                {letter}
              </h1>
              {/* tooltip */}
              <div className=" absolute  mt-1 hidden w-8 flex-col rounded bg-brand p-1 text-center group-hover:flex  group-hover:animate-bounce ">
                {letter === "G"
                  ? ["O", "D"].map((letter) => (
                      <span key={letter}>{letter}</span>
                    ))
                  : letter === "W"
                    ? ["W", "A", "N", "T", "S"].map((letter) => (
                        <span key={letter}>{letter}</span>
                      ))
                    : letter === "M"
                      ? ["E"].map((letter) => (
                          <span key={letter}>{letter}</span>
                        ))
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
        {pathname !== "/checkout" && (
          <CartButton
            className="hidden sm:flex"
            cartCount={getCartTotalCount()}
            onClick={handleOpenCart}
          />
        )}

        <ProfileMenu />
      </div>
    </div>
  );
}
