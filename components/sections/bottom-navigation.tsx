import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/ui/button";
import SearchButton from "@/components/ui/search-button";
import CartButton from "@/components/ui/cart-button";
import Hamburger from "@/components/ui/hamburger";
import { HomeIcon } from "@/components/icons/home-icon";
import { useCart } from "@/context/cart-context";
import { useDrawer } from "../drawer/drawer-context";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const { getCartTotalCount } = useCart();

  const drawer = useDrawer();

  function handleOpenCart() {
    drawer.openDrawer("CART_VIEW");
  }
  return (
    <nav className="fixed -bottom-1 z-30 grid h-14 w-full auto-cols-fr grid-flow-col items-center bg-light py-2 text-center shadow-bottom-nav dark:bg-dark-250 sm:hidden">
      <Button
        variant="icon"
        aria-label="Home"
        onClick={() => router.push("/", { scroll: false })}
      >
        <HomeIcon className="h-full w-5" />
      </Button>
      <SearchButton />
      {pathname !== "/checkout" && (
        <CartButton
          className="mt-1.5"
          cartCount={getCartTotalCount()}
          onClick={handleOpenCart}
        />
      )}
      <Hamburger onClick={() => window.alert("TODO: Mobile menu drawer")} />
    </nav>
  );
}
