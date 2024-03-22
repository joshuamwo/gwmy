import { Fragment, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { Transition } from "@/components/ui/transition";
import { useDrawer } from "@/components/drawer/drawer-context";
import { Drawer, DrawerType } from "@/types";
import MobileMenu from "../ui/mobile-menu";
const CartDrawer = dynamic(() => import("@/components/cart/cart-drawer"));
const SidebarDrawer = dynamic(() => import("@/layouts/sidebar-layout"));

function renderDrawerContent(view: DrawerType) {
  switch (view) {
    case "MOBILE_MENU":
      return <MobileMenu />;
    default:
      return <CartDrawer />;
  }
}

export default function DrawersContainer() {
  let pathname = usePathname();
  const { drawerType, isOpen, closeDrawer } = useDrawer();

  useEffect(() => {
    // close drawer when route change
    closeDrawer();
  }, [pathname]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-hidden"
        onClose={closeDrawer}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 cursor-pointer bg-dark bg-opacity-60 backdrop-blur transition-opacity dark:bg-opacity-80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="-translate-x-[75%]"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-[75%]"
        >
          <div className="fixed inset-y-0 left-0 flex w-full max-w-full">
            <div className="w-[75%] max-w-md">
              <div className="flex h-full flex-col bg-light shadow-xl dark:bg-dark-300">
                {drawerType && renderDrawerContent(drawerType)}
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
