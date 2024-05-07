import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/ui/button";
import SearchButton from "@/components/ui/search-button";
import CartButton from "@/components/ui/cart-button";
import Hamburger from "@/components/ui/hamburger";
import { HomeIcon } from "@/components/icons/home-icon";
import { useCart } from "@/context/cart-context";
import { useDrawer } from "../drawer/drawer-context";
import { ShoppingBagIcon } from "../ui/shopping-bag-icon";
import { MusicIconSolid } from "../icons/musicIconSolid";
import NavLink from "../ui/nav-link";
import { MusicIcon } from "../ui/music-icon";
import { ShoppingBagIconSolid } from "../icons/shopping-bag-icon-solid";
import { TicketIcon } from "../icons/ticket-icon";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const { getCartTotalCount } = useCart();

  const drawer = useDrawer();

  function handleOpenCart() {
    drawer.openDrawer("CART_VIEW");
  }
  return (
    <nav className="z-30 grid h-14 w-full auto-cols-fr grid-flow-col items-center rounded-lg bg-light-400 text-center text-dark-600 transition-all duration-300 dark:bg-dark-100 dark:text-light-900 sm:hidden">
      {/* <Button
        variant="icon"
        aria-label="Home"
        onClick={() => router.push("/music", { scroll: false })}
        className="h-full"
      >
        <MusicIconSolid className="h-5 w-5" />
      </Button>
      <Button
        variant="icon"
        aria-label="Merch"
        onClick={() => router.push("/merch", { scroll: false })}
        className="h-full"
      >
        <ShoppingBagIcon className="fill h-5 w-5  " />
      </Button> */}
      <NavLink
        title="My Music"
        href="/music"
        sidebarIsOpen={false}
        icon={<MusicIconSolid className="h-6 w-6 " />}
      />
      {/* <NavLink
        title="Merch"
        href="/merch"
        sidebarIsOpen={false}
        icon={<ShoppingBagIconSolid className="h-6 w-6" />}
      /> */}
      <NavLink
        title="Events"
        href="/events"
        sidebarIsOpen={false}
        icon={<TicketIcon className="h-6 w-6 text-current " />}
      />
      <SearchButton className="h-full" />
      {pathname !== "/checkout" && (
        <CartButton
          className="h-full"
          cartCount={getCartTotalCount()}
          onClick={handleOpenCart}
        />
      )}
      {/* <Hamburger
        className="h-full"
        onClick={() => drawer.openDrawer("MOBILE_MENU")}
      /> */}
    </nav>
  );
}
